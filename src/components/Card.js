import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import {
  apiBaseUrl,
  apiToken,
  popupTypeDeleteCard,
  likeActive,
} from "../utils/data.js";

class Card {
  constructor(item, user, templateSelector, clickImageHandler) {
    this._item = item;
    this._user = user;
    this._templateSelector = templateSelector;
    this._clickImageHandler = clickImageHandler;
    this._api = new Api(apiBaseUrl, apiToken);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.setAttribute("id", "card_" + this._item._id);
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLikeImage = this._element.querySelector(".element__like");
    this._elementLikeCounter = this._element.querySelector(
      ".element__like-counter"
    );

    this._elementDeleteCard = this._element.querySelector(
      ".element__delete-button"
    );

    if (this._item.owner._id === this._user._id) {
      this._elementDeleteCard.style.display = "block";
    }

    this._elementImage.src = this._item.link;
    this._elementImage.alt = this._item.name;
    this._elementTitle.textContent = this._item.name;
    this._elementLikeCounter.textContent = this._item.likes.length;

    this._item.likes.forEach((like) => {
      if (like._id === this._user._id) {
        this._elementLikeImage.classList.add(likeActive);
      }
    });

    this._setEventListeners(this._elementImage);

    return this._element;
  }

  _handleLikeImageOnClick() {
    if (this._elementLikeImage.classList.contains(likeActive)) {
      this._api
        .deleteLike(this._item._id)
        .then((card) => {
          this._elementLikeCounter.textContent = card.likes.length;
          this._elementLikeImage.classList.remove(likeActive);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      this._api
        .putLike(this._item._id)
        .then((card) => {
          this._elementLikeCounter.textContent = card.likes.length;
          this._elementLikeImage.classList.add(likeActive);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  _handleImageOnClick() {
    this._clickImageHandler({ link: this._item.link, name: this._item.name });
  }

  _handleDeletePopupCardOnClick() {
    const popup = new PopupDeleteCard(popupTypeDeleteCard, this._item._id);
    popup.setEventListeners();
    popup.open();
  }

  _setEventListeners() {
    this._elementDeleteCard.addEventListener("click", () => {
      this._handleDeletePopupCardOnClick();
    });
    this._elementLikeImage.addEventListener("click", () => {
      this._handleLikeImageOnClick();
    });
    this._elementImage.addEventListener("click", () => {
      this._handleImageOnClick();
    });
  }
}

export default Card;
