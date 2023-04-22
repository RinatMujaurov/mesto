import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupHandler, buttonText = "Сохранить") {
    super(popupSelector);
    this._handler = popupHandler;
    this._buttonText = buttonText;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handler(this.getInputValues());
    });
    super.setEventListeners();
  }

  loadingButtonText(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Сохранение..."
      : this._buttonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
