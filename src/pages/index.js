import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {options, initialCards, selector, profileOpenButton, formElementProfile, popupOpenAddButtonElement, formElementCard, popupImage, popupAddCardSelector, popupEditProfileSelector, nameSelector, aboutSelector} from '../utils/data.js';
import './index.css';

const profileFormValidate = new FormValidator(options, formElementProfile);
const cardFormValidate = new FormValidator(options, formElementCard);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

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












