const baseBtnClasses = "px-4 py-2 text-sm rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#1C352D]/40";

class BtnReset extends HTMLElement {
  constructor() {
    super();
    
    this.content = this.getAttribute('content') || 'Simpan';
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <button
        type="reset"
        aria-label="${this.content}"
        class="${baseBtnClasses} font-medium bg-[#1C352D]/10 text-[#1C352D] hover:bg-[#1C352D]/20"
      >${this.content}</button>
    `;
  }
}

class BtnSubmit extends HTMLElement {
  constructor() {
    super();
    
    this.content = this.getAttribute('content') || 'Simpan';
  }
  connectedCallback() {
    this.render();
  }
  render() {
    
    this.innerHTML = `
      <button
        type="submit"
        aria-label="${this.content}"
        class="${baseBtnClasses} font-semibold bg-[#1C352D] text-white hover:bg-[#1C352D]/90"
      >${this.content}</button>
    `;
  }
}

customElements.define('btn-reset', BtnReset);
customElements.define('btn-submit', BtnSubmit);