export default class Section {
  constructor({ items, user, renderer }, selector) {
    this._items = items;
    this._user = user;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._container.append(this._renderer(item, this._user));
    });
  }
}
