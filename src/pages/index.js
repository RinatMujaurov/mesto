import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupOpenEditAvatar,
  apiBaseUrl,
  apiToken,
  options,
  selector,
  profileOpenButton,
  formElementProfile,
  popupOpenAddButtonElement,
  formElementCard,
  popupImage,
  popupAddCardSelector,
  popupEditAvatarSelector,
  popupEditProfileSelector,
  nameSelector,
  aboutSelector,
  avatarSelector,
} from "../utils/data.js";
import "./index.css";

let currentUser;

const profileFormValidate = new FormValidator(options, formElementProfile);
const cardFormValidate = new FormValidator(options, formElementCard);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

const api = new Api(apiBaseUrl, apiToken);

let cardSectionData = {
  items: [],
  renderer: createCard,
};

let cardSection = new Section(cardSectionData, selector);

const userInfo = new UserInfo({ nameSelector, aboutSelector, avatarSelector });

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const submitAddCardFormHandler = ({ name, link }, popup) => {
  api
    .addCard({ name, link })
    .then((card) => {
      cardSection.addItem(createCard(card, currentUser));
      popup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

const submitEditAvatar = ({ avatar }, popup) => {
  api
    .setAvatar({ avatar })
    .then((user) => {
      document.querySelector(avatarSelector).src = user.avatar;
      popup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  submitAddCardFormHandler
);

popupAddCard.setEventListeners();

const popupSetAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  submitEditAvatar
);

popupSetAvatar.setEventListeners();

const submitProfileFormHandler = ({ name, about }, popup) => {
  api
    .setUserInfo({ name, about })
    .then((user) => {
      userInfo.setUserInfo(user);
      popup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  submitProfileFormHandler
);
popupEditProfile.setEventListeners();

const clickImageHandler = ({ link, name }) => {
  popupWithImage.open({ link, name });
};

function createCard(item, user) {
  return new Card(
    item,
    user,
    "#template-element",
    clickImageHandler
  ).generateCard();
}

function openPopupCardOnClick() {
  cardFormValidate.resetValidation();
  popupAddCard.open();
}

function openPopupEditAvatar() {
  cardFormValidate.resetValidation();
  popupSetAvatar.open();
}

popupOpenAddButtonElement.addEventListener("click", openPopupCardOnClick);
popupOpenEditAvatar.addEventListener("click", openPopupEditAvatar);

// Открытие попапа профиля
function openPopupProfileOnClick() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  profileFormValidate.resetValidation();
}

profileOpenButton.addEventListener("click", openPopupProfileOnClick);

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo(user);

    currentUser = user;

    api
      .getInitialCards()
      .then((cards) => {
        cardSectionData = {
          items: cards,
          user: currentUser,
          renderer: createCard,
        };

        cardSection = new Section(cardSectionData, selector);
        cardSection.renderItems();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
