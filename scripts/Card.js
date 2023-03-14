class Card {
  constructor(name, link, templateSelector, popupImage, popupImageElement, popupImageElementTitle, openPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._popupImage = popupImage;
    this._popupImageElement = popupImageElement;
    this._popupImageElementTitle = popupImageElementTitle;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLikeImage = this._element.querySelector('.element__like');
    this._elementDeleteCard = this._element.querySelector('.element__delete-button');


    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners(this._elementImage);

    return this._element;
}

_handleLikeImageOnClick() {
  this._elementLikeImage.classList.toggle('element__like_active')
}

_handleImageOnClick() {
  this._popupImageElement.src = this._link;
  this._popupImageElement.alt = this._name;
  this._popupImageElementTitle.textContent = this._name;
  this._openPopup(this._popupImage);
}

_handleDeleteCardOnClick() {
  this._element.remove();
}

_setEventListeners() {
  this._elementDeleteCard.addEventListener('click', () => {
      this._handleDeleteCardOnClick();
  });
  this._elementLikeImage.addEventListener('click', () => {
      this._handleLikeImageOnClick();
  });
  this._elementImage.addEventListener('click', () => {
        this._handleImageOnClick();
  });
}
}

export default Card
