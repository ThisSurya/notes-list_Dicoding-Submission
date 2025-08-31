import { animate, scroll } from "motion";
class NotesList extends HTMLElement {
  constructor() {
    super();
    this.notesData = [];
    this.loading = false;
  }

  connectedCallback() {
    this.render();
  }

  set data(notes) {
    this.loading = false;
    this.notesData = notes || [];
    this.render();
  }

  set isLoading(loading) {
    this.loading = loading;
    this.render();
  }

  formatDate(iso) {
    try {
      return new Date(iso).toISOString().split("T")[0];
    } catch {
      return iso;
    }
  }

  NoteTemplate(note) {
    return `
      <div class="note-card bg-[#A6B28B]/10 border-4 border-[#A6B28B] rounded-lg p-4 space-y-2 max-w-lg w-full col-span-1" data-id="${
        note.id
      }" data-archived="${note.archived}">
        <div class="flex items-center">
          <h1 class="font-semibold flex-1">${note.title}</h1>
          <div class="relative menu-container">
            <button
              type="button"
              class="menu-toggle p-2 bg-[#A6B28B]/25 rounded-md cursor-pointer hover:bg-[#A6B28B]/40 focus:outline-none focus:ring-2 focus:ring-[#1C352D]/30"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="menu-${note.id}"
              title="Actions"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="stroke-[#1C352D]/70 size-4">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>

            <!-- Dropdown -->
              <div
                id="menu-${note.id}"
                role="menu"
                class="dropdown-menu absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-[#A6B28B] bg-white shadow-lg overflow-hidden
                      opacity-0 scale-95 pointer-events-none transition ease-out duration-150"
              >
              <button type="button" data-action="archive"
                class="dropdown-item block w-full px-3 py-2 text-left text-sm hover:bg-[#A6B28B]/20 cursor-pointer">
                ${note.archived ? "Unarchive" : "Archive"}
              </button>
              <button type="button" data-action="delete"
                class="dropdown-item block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                Delete
              </button>
              </div>
            </div>
        </div>

        <p class="text-ellipsis text-justify whitespace-pre-line">${
          note.body
        }</p>

        <div class="p-2 px-3 bg-[#A6B28B]/25 rounded-md flex gap-1.5 items-center w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="size-3 stroke-[#1C352D]/70">
            <path d="M13 21h8" />
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          </svg>
          <p class="text-xs text-[#1C352D]/70 font-medium">${this.formatDate(
            note.createdAt,
          )}</p>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();

    // Event delegation for toggling menus
    this._onClick = (e) => {
      const toggleBtn = e.target.closest(".menu-toggle");
      if (toggleBtn && this.contains(toggleBtn)) {
        e.stopPropagation();
        this._toggleMenu(toggleBtn);
        return;
      }

      const item = e.target.closest(".dropdown-item");
      if (item && this.contains(item)) {
        const action = item.dataset.action;
        const card = item.closest("[data-id]");
        const id = card?.getAttribute("data-id");
        const archived = card?.getAttribute("data-archived");
        // TODO: handle edit/delete
        this._closeAllMenus();
        this.dispatchEvent(
          new CustomEvent("note-action", {
            detail: { action, id, archived },
            bubbles: true,
          }),
        );
      }
    };

    this.addEventListener("click", this._onClick);

    // Close on outside click
    this._onDocClick = (e) => {
      if (!this.contains(e.target)) this._closeAllMenus();
    };
    document.addEventListener("click", this._onDocClick);

    // Close on Escape
    this._onKeydown = (e) => {
      if (e.key === "Escape") this._closeAllMenus();
    };
    document.addEventListener("keydown", this._onKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
    document.removeEventListener("click", this._onDocClick);
    document.removeEventListener("keydown", this._onKeydown);
  }

  _toggleMenu(btn) {
    const container = btn.closest(".menu-container");
    const menu = container?.querySelector(".dropdown-menu");
    if (!menu) return;

    const isOpen = btn.getAttribute("aria-expanded") === "true";
    this._closeAllMenus();

    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      menu.classList.remove("opacity-0", "scale-95", "pointer-events-none");
      menu.classList.add("opacity-100", "scale-100");
    } else {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.add("opacity-0", "scale-95", "pointer-events-none");
      menu.classList.remove("opacity-100", "scale-100");
    }
  }

  _closeAllMenus() {
    this.querySelectorAll('.menu-toggle[aria-expanded="true"]').forEach(
      (btn) => {
        btn.setAttribute("aria-expanded", "false");
      },
    );
    this.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.add("opacity-0", "scale-95", "pointer-events-none");
      menu.classList.remove("opacity-100", "scale-100");
    });
  }

  _animateCards() {
    const cards = this.querySelectorAll(".note-card");
    cards.forEach((el, i) => {
      if (el.dataset.animated === "true") return;
      const controls = animate(
        el,
        { scale: [0.4, 1], opacity: [0, 1] },
        { ease: "circInOut", duration: 1.2, delay: i * 0.05 },
      );
      controls.finished.then(() => {
        el.dataset.animated = "true";
      });
    });
  }

  render() {
    if (this.loading) {
      // this.innerHTML = `<p class="text-gray-500">Sedang memuat</p`;
      this.innerHTML = `<div class="flex items-center justify-center py-6 lg:col-span-2 col-span-1">
    <svg class="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  </div>`;
      return;
    }

    if (!this.notesData || this.notesData.length === 0) {
      this.innerHTML = `<p class="text-gray-500">No notes available.</p>`;
      return;
    }
    this.innerHTML = this.notesData
      .map((note) => this.NoteTemplate(note))
      .join("");

    requestAnimationFrame(() => this._animateCards());
  }
}

customElements.define("notes-list", NotesList);
