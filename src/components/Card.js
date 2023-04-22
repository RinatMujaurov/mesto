class Card {
  constructor(
    item,
    user,
    templateSelector,
    clickImageHandler,
    clickDeleteHandler,
    clickLikeHandler
  ) {
    this._item = item;
    this._user = user;
    this._templateSelector = templateSelector;
    this._clickImageHandler = clickImageHandler;
    this._clickDeleteHandler = clickDeleteHandler;
    this._clickLikeHandler = clickLikeHandler;
    this._isLiked = item.likes.some((like) => {
      return like._id === this._user.id;
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLikeImage = this._element.querySelector(".element__like");
    this._elementLikeCounter = this._element.querySelector(
      ".element__like-counter"
    );
    this._elementDeleteCard = this._element.querySelector(
      ".element__delete-button"
    );

    if (this._item.owner._id === this._user.id) {
      this._elementDeleteCard.classList.add("element__delete-button_visible");
    }

    this._elementImage.src = this._item.link;
    this._elementImage.alt = this._item.name;
    this._elementTitle.textContent = this._item.name;
    this._elementLikeCounter.textContent = this._item.likes.length;

    if (this._isLiked) {
      this._elementLikeImage.classList.add("element__like_active");
    }

    this._setEventListeners(this._elementImage);
    return this._element;
  }

  _removeCard() {
    this._element.remove();
  }

  _setLike(counter) {
    if (this._isLiked) {
      this._elementLikeImage.classList.remove("element__like_active");
    } else {
      this._elementLikeImage.classList.add("element__like_active");
    }
    this._isLiked = !this._isLiked;
    this._elementLikeCounter.textContent = counter;
  }

  _handleLikeImageOnClick() {
    this._clickLikeHandler(
      this._item._id,
      this._isLiked,
      this._setLike.bind(this)
    );
  }

  _handleImageOnClick() {
    this._clickImageHandler({ link: this._item.link, name: this._item.name });
  }

  _handleDeletePopupCardOnClick() {
    this._clickDeleteHandler(this._item._id, this._removeCard.bind(this));
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
