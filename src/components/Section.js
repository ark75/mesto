export default class Section {
  constructor({items, renderer}, elementsSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._elements = document.querySelector(elementsSelector)
  }

  addItem(cardElement) {
    this._elements.prepend(cardElement);
  };

  generateCards() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
