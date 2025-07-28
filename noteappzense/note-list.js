class NoteList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.notes = [];
    }
  
    connectedCallback() {
      this.render();
    }
  
    setNotes(notes) {
      this.notes = notes;
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .note-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 10px;
          }
          .note-list-empty {
            text-align: center;
            color: #fff;
          }
        </style>
        <div class="note-list">
          ${this.notes.length ? 
            this.notes.map(note => `
              <note-item 
                id="${note.id}" 
                title="${note.title}" 
                body="${note.body}" 
                date="${new Date(note.createdAt).toLocaleDateString()}">
              </note-item>
            `).join('') :
            '<p class="note-list-empty">No notes available</p>'
          }
        </div>
      `;
  
      this.shadowRoot.querySelectorAll('note-item').forEach(item => {
        item.addEventListener('delete-note', (event) => {
          this.dispatchEvent(new CustomEvent('delete-note', {
            detail: event.detail,
            bubbles: true,
            composed: true
          }));
        });
      });
    }
  }
  
  customElements.define('note-list', NoteList);
  