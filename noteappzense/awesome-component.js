class AwesomeComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 'Aku adalah web component terbaik.';
  }
}

customElements.define('awesome-component', AwesomeComponent);
