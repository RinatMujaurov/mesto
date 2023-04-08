import Popup from "./Popup.js";
import { options } from "../utils/data.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(
      options.submitButtonSelector
    );
    this._submitButtonName = this._submitButton.innerHTML;
  }

  _getInputValues() {
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
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues(), this);
      this._submitButton.textContent = "Сохранение...";
    });
  }

  close() {
    this._form.reset();
    super.close();
    setTimeout(() => {
      this._submitButton.textContent = this._submitButtonName;
    }, "600"); //анимация плавного закрытия попапа 500мс
  }
}
