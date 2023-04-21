import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupHandler) {
    super(popupSelector);
    this._handler = popupHandler;
    this._form = this._popup.querySelector(".popup__form_type_delete");
    this._button = this._popup.querySelector(".popup__delete-button");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handler(...this._values);
    });
    super.setEventListeners();
  }

  loadingButtonText(isLoading) {
    this._button.textContent = isLoading ? "Удаление..." : "Да";
  }

  open(...values) {
    super.open();
    this._values = [...values];
  }
}
