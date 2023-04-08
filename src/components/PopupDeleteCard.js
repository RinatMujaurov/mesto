import Api from "../components/Api.js";
import Popup from "./Popup.js";
import { apiBaseUrl, apiToken, popupDeleteButton } from "../utils/data.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, id) {
    super(popupSelector);
    this._id = id;
    this._api = new Api(apiBaseUrl, apiToken);
  }

  deleteCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        document.getElementById("card_" + this._id).remove();
        this.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  setEventListeners() {
    super.setEventListeners();
    popupDeleteButton.addEventListener("click", () => {
      this.deleteCard();
    });
  }
}
