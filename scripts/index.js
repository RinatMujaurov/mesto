import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from './initialCards.js';
import options from './options.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const selector = ('.elements');

//общий попап
// const popups = Array.from(document.querySelectorAll('.popup'));

//попап редактирования профиля
// const popupElementProfile = document.querySelector('.popup_type_profile');
const profileOpenButton = document.querySelector('.profile__edit-button');
const formElementProfile = document.forms['profile-info'];
// const profileName = document.querySelector('.profile__name');
// const profileJob = document.querySelector('.profile__about');
// const nameInput = formElementProfile.querySelector('.popup__input_data_name');
// const jobInput = formElementProfile.querySelector('.popup__input_data_about');

//попап добавления карточки
// const popupElementCard = document.querySelector('.popup_type_element');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formElementCard = document.forms['element'];
// const inputCardLink = document.querySelector('.popup__input_data_link');
// const inputCardTitle = document.querySelector('.popup__input_data_title');


const popupImage = '.popup_type_image';
const popupAddCardSelector = '.popup_type_element';
const popupEditProfileSelector = '.popup_type_profile';
const nameSelector = '.profile__name';
const aboutSelector = '.profile__about';

const profileFormValidate = new FormValidator(options, formElementProfile);
const cardFormValidate = new FormValidator(options, formElementCard);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

//вывод карточек на страницу
const userInfo = new UserInfo({nameSelector, aboutSelector});

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const submitAddCardFormHandler = ({title, link}) => {
  cardSection.addItem(createCard({name: title, link: link}));
}

const popupAddCard = new PopupWithForm(popupAddCardSelector, submitAddCardFormHandler);
popupAddCard.setEventListeners();

const submitProfileFormHandler = ({name, about}) => {
  userInfo.setUserInfo({name, about});
}

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitProfileFormHandler);
popupEditProfile.setEventListeners();

const clickImageHandler = ({link, name}) => {
  popupWithImage.open({link, name});
};

function createCard(item) {
  return new Card(
    item.name,
    item.link,
    '#template-element',
    clickImageHandler).generateCard();
};

const cardSectionData = {
  items: initialCards,
  renderer: createCard
};

const cardSection = new Section(cardSectionData, selector);
cardSection.renderItems();

function openPopupCardOnClick() {
  popupAddCard.open();
}

popupOpenAddButtonElement.addEventListener('click', openPopupCardOnClick);

// Открытие попапа профиля
function openPopupProfileOnClick() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  profileFormValidate.resetValidation();
}

profileOpenButton.addEventListener('click', openPopupProfileOnClick);












