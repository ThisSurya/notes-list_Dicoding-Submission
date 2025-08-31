class FilterButton extends HTMLElement {
  static get observedAttributes() {
    return ["action", "active", "disabled", "label"];
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._btn = null;
    this._label = "";
  }

  connectedCallback() {
    if (!this._btn) {
      this._label =
        (this.getAttribute("label") ?? this.textContent.trim()) || "Button";
      this.innerHTML = "";
      this._btn = document.createElement("button");
      this._btn.type = "button";
      this.appendChild(this._btn);
    }
    this._btn.textContent = this._label;
    this._applyClasses();
    this._btn.addEventListener("click", this._onClick);
  }

  disconnectedCallback() {
    this._btn?.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback() {
    this._applyClasses();
  }

  get action() {
    return this.getAttribute("action") || "";
  }

  get active() {
    return this.hasAttribute("active");
  }
  set active(v) {
    if (v) this.setAttribute("active", "");
    else this.removeAttribute("active");
  }

  _onClick() {
    this.dispatchEvent(
      new CustomEvent("filter-select", {
        detail: { action: this.action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _applyClasses() {
    if (!this._btn) return;
    const base = [
      "px-3",
      "py-1",
      "rounded-full",
      "bg-[#A6B28B]",
      "text-white",
      "hover:bg-[#A6B28B]/90",
      "transition",
      "duration-150",
      "ease-out",
      "cursor-pointer",
    ];
    this._btn.className = base.join(" ");
    this._btn.dataset.action = this.action;
    this._btn.disabled = this.hasAttribute("disabled");
    this._btn.setAttribute("aria-pressed", String(this.active));
    if (this.active) {
      this._btn.classList.add("ring-2", "ring-[#1C352D]/40", "font-semibold");
    }
  }
}

customElements.define("filter-button", FilterButton);
