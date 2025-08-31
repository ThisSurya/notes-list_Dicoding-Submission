import "../main.css";
import "./FormComponent.js";
import "./NotesList.js";
import "./FilterButton.js";
import { CustomFormRequest } from "../../request/FormRequest.js";
import { NoteService } from "../../services/NoteService.js";

/* ---------- Konstanta & state ---------- */
const FILTERS = {
  ALL: "all",
  ARCHIVED: "archived",
  UNARCHIVED: "unarchived",
};
let currentFilter = FILTERS.ALL;

/* ---------- Helper ---------- */
const toFilter = (raw) => {
  if (!raw) return FILTERS.ALL;
  const s = String(raw).toLowerCase();
  if (s.includes("unarchived")) return FILTERS.UNARCHIVED;
  if (s.includes("archived")) return FILTERS.ARCHIVED;
  return FILTERS.ALL;
};

const safeQuery = (sel) => document.querySelector(sel);

const setActiveFilter = (container, sourceEl, token) => {
  if (!container) return;
  // console.log("Check Filter-button exist", container.querySelectorAll("filter-button"));
  container.querySelectorAll("filter-button").forEach((el) => {
    const elToken = toFilter(
      el.getAttribute("action") || el.getAttribute("filter")
    );
    // console.log(el.getAttribute("data-action"), el.getAttribute("data-filter"));
    el.toggleAttribute(
      "active",
      elToken === token && (sourceEl ? el === sourceEl : true)
    );
  });
};

/* ---------- Init: form, validation, listeners ---------- */
window.addEventListener("DOMContentLoaded", async () => {
  await customElements.whenDefined("form-component");

  const createFormEl = safeQuery("form-component");
  const form = createFormEl?.querySelector("#noteForm");
  if (!form) return;

  const titleInput = form.elements["title"];
  const contentInput = form.elements["content"];

  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    try {
      await CreateForm(evt);
    } catch (err) {
      console.error("Error creating note:", err);
      alert(`Error: ${err?.message || err}`);
      return;
    }finally {
      form.reset();
      GetNote(currentFilter);
    }
    // maintain current tab after create
  });

  ["change", "invalid", "input"].forEach((ev) => {
    titleInput.addEventListener(ev, CustomFormRequest);
    contentInput.addEventListener(ev, CustomFormRequest);
  });

  const showValidationOnBlur = (event) => {
    const el = event.target;
    const connectedId = el.getAttribute("aria-describedby");
    const messageEl = connectedId ? document.getElementById(connectedId) : null;
    if (!messageEl) return;
    const error = el.validationMessage;
    messageEl.innerText = el.validity.valid ? "" : error;
  };
  titleInput.addEventListener("blur", showValidationOnBlur);
  contentInput.addEventListener("blur", showValidationOnBlur);

  // initial load
  GetNote(currentFilter);
});

/* ---------- Handle note-action (archive / delete) ---------- */
document.addEventListener("note-action", async (e) => {
  const { action, id, archived } = e.detail || {};
  if (!id) return;

  try {
    if (action === "delete") {
      await NoteService.deleteNote(id);
    } else if (action === "archive") {
      // archived may be "true"/"false" string or boolean
      const isArchived = archived === true || archived === "true";
      if (isArchived) {
        await NoteService.unarchiveNote(id);
      } else {
        await NoteService.archiveNote(id);
      }
    }

    // refresh sesuai tab aktif (source of truth)
    await GetNote(currentFilter);
  } catch (err) {
    console.error("note-action failed:", err);
    alert(`Error: ${err?.message || err}`);
  }
});

/* ---------- Handle filter-select ---------- */
document.addEventListener("filter-select", (e) => {
  const raw = e.detail?.action;
  const token = toFilter(raw);
  currentFilter = token;

  // attempt to get element that dispatched event (works with composedPath)
  const path = e.composedPath ? e.composedPath() : [e.target];
  const source =
    path.find(
      (n) => n && n.tagName && n.tagName.toLowerCase() === "filter-button"
    ) || path[0];

  // try to find a sensible container (closest .filter-container or fallback)
  const containerFromSource = source?.closest
    ? source.closest(".filter-container")
    : null;
  const container =
    containerFromSource || document.querySelector(".filter-container");
  setActiveFilter(container, source, token);
  console.log("Filter changed to:", token);
  GetNote(currentFilter);
});

/* ---------- Form create ---------- */
async function CreateForm(event) {
  const form = event.target;
  const title = form.elements["title"].value;
  const body = form.elements["content"].value;

  try {
    await NoteService.createNote({ title, body });
    form.reset();
  } catch (err) {
    console.error("Error creating note:", err);
    alert(`Error: ${err?.message || err}`);
  }
}

/* ---------- Fetch & render notes (single source of truth) ---------- */
async function GetNote(filter = FILTERS.ALL) {
  const noteslist = safeQuery("notes-list");
  if (!noteslist) return;

  try {
    noteslist.isLoading = true;

    // beri kesempatan browser nge-paint loading state (berguna jika respon super cepat)
    await new Promise((r) => requestAnimationFrame(r));

    let response;
    if (filter === FILTERS.ARCHIVED) {
      response = await NoteService.getArchivedNotes();
    } else if (filter === FILTERS.UNARCHIVED) {
      // assuming you have an endpoint for unarchived; otherwise fetch all and filter client-side
      response =
        (await NoteService.getUnarchivedNotes?.()) ??
        (await NoteService.getNote());
    } else {
      response = await NoteService.getNote();
    }

    if (!response || response.status === "fail") {
      noteslist.innerHTML = `<p class="text-red-500">Error: ${
        response?.message || "Unknown"
      }</p>`;
      return;
    }

    noteslist.data = response.data;
  } catch (err) {
    console.error("Error while fetching data:", err);
    noteslist.innerHTML = `<p class="text-red-500">Error: ${
      err?.message || err
    }</p>`;
    alert(`Error: ${err?.message || err}`);
  } finally {
    noteslist.isLoading = false;
  }
}
