class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    static get observedAttributes() {
      return ['title', 'body', 'date', 'id'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const title = this.getAttribute('title');
      const body = this.getAttribute('body');
      const date = this.getAttribute('date');
      const id = this.getAttribute('id');
  
      this.shadowRoot.innerHTML = `
        <style>
          .note-item {
            padding: 15px;
            border: 1px solid #333;
            border-radius: 4px;
            background-color: #2c2c2c;
            margin: 10px;
          }
          .note-item-title {
            font-size: 18px;
            margin-bottom: 5px;
            color: #ff0000;
          }
          .note-item-body-content {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .note-item-date {
            font-size: 12px;
            color: #999;
          }
          .delete-button {
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
            background-color: #000;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .delete-button:hover {
            background-color: #333;
          }
        </style>
        <div class="note-item">
          <h3 class="note-item-title">${title}</h3>
          <p class="note-item-body-content">${body}</p>
          <p class="note-item-date">${date}</p>
          <button class="delete-button">Delete</button>
        </div>
      `;
  
      this.shadowRoot.querySelector('.delete-button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('delete-note', {
          detail: { id: id },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  customElements.define('note-item', NoteItem);
  