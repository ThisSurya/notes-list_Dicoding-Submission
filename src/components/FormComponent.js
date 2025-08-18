  import "./ButtonComponents.js";

  class FormComponent extends HTMLElement {
    constructor() {
      super();
      // this.attachShadow({ mode: "open" });
      this.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <form id="noteForm" class="bg-[#A6B28B]/10 border-4 border-[#A6B28B] rounded-lg p-4 space-y-4 w-full mb-4">
            <h1 class="font-semibold text-[#1C352D]/70">Tambah Catatan</h1>
            <div class="space-y-1">
              <label for="title" class="block text-sm font-semibold text-[#1C352D]">Judul</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Masukkan judul catatan"
                aria-describedby="titleValidation"
                minlength="6"
            pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                required
                class="w-full rounded-md border-2 border-[#A6B28B] bg-white/60 focus:bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C352D]/40 focus:border-[#1C352D] transition"
              />
              <p id="titleValidation" class="text-xs text-red-600" aria-live="polite"></p>
            </div>
            <div class="space-y-1">
              <label for="content" class="block text-sm font-semibold text-[#1C352D]">Isi</label>
              <textarea
                id="content"
                name="content"
                placeholder="Tulis isi catatan di sini..."
                rows="5"
                aria-describedby="contentValidation"
                minlength="6"
            pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                required
                class="w-full rounded-md border-2 border-[#A6B28B] bg-white/60 focus:bg-white px-3 py-2 text-sm outline-none resize-y focus:ring-2 focus:ring-[#1C352D]/40 focus:border-[#1C352D] transition"
              ></textarea>
              <p id="contentValidation" class="text-xs text-red-600" aria-live="polite"></p>
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <btn-reset content="Reset"></btn-reset>
              <btn-submit content="Simpan"></btn-submit>
            </div>
          </form>
      `;
    }
  }
  customElements.define("form-component", FormComponent);
