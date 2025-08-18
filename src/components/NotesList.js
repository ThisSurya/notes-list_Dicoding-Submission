// import { notesData } from '../data/mockdata.js';
import { notesData } from '../../data/mockdata.js';

class NotesList extends HTMLElement{
  constructor() {
    super();

  }

  connectedCallback() {
    this.render();
  }

  formatDate(iso) {
    try {
      return new Date(iso).toISOString().split('T')[0];
    } catch {
      return iso;
    }
  }

  NoteTemplate(note){
    return `
      <div class="bg-[#A6B28B]/10 border-4 border-[#A6B28B] rounded-lg p-4 space-y-2 max-w-lg w-full col-span-1" data-id="${note.id}">
        <div class="flex items-center">
          <h1 class="font-semibold flex-1">${note.title}</h1>
          <div class="p-2 bg-[#A6B28B]/25 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="stroke-[#1C352D]/70 size-4">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>

        <p class="text-ellipsis text-justify whitespace-pre-line">${note.body}</p>

        <div class="p-2 px-3 bg-[#A6B28B]/25 rounded-md flex gap-1.5 items-center w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="size-3 stroke-[#1C352D]/70">
            <path d="M13 21h8" />
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          </svg>
          <p class="text-xs text-[#1C352D]/70 font-medium">${this.formatDate(note.createdAt)}</p>
        </div>
      </div>
    `;
  }

  render() {
    this.innerHTML = notesData.map(note => this.NoteTemplate(note)).join('');
  }
}

customElements.define('notes-list', NotesList);