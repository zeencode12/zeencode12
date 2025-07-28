class NoteForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          input, textarea {
            padding: 10px;
            border: 1px solid #333;
            border-radius: 4px;
            background-color: #2c2c2c;
            color: #fff;
          }
          textarea {
            resize: vertical;
            height: 100px;
          }
          button {
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #ff0000;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #cc0000;
          }
        </style>
        <form id="noteForm">
          <input type="text" id="noteTitle" placeholder="Title" required />
          <textarea id="noteBody" placeholder="Body" required></textarea>
          <button type="submit">Add Note</button>
        </form>
      `;
  
      this.shadowRoot.querySelector('#noteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = this.shadowRoot.querySelector('#noteTitle').value.trim();
        const body = this.shadowRoot.querySelector('#noteBody').value.trim();
        if (title && body) {
          this.dispatchEvent(new CustomEvent('add-note', {
            detail: { title, body },
            bubbles: true,
            composed: true
          }));
          this.shadowRoot.querySelector('#noteTitle').value = '';
          this.shadowRoot.querySelector('#noteBody').value = '';
        }
      });
    }
  }
  
  customElements.define('note-form', NoteForm);
  