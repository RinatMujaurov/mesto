import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
  popupTypeDeleteCard,
} from "../utils/data.js";
import "./index.css";

const profileFormValidate = new FormValidator(options, formElementProfile);
const cardFormValidate = new FormValidator(options, formElementCard);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

const api = new Api(apiBaseUrl, apiToken);
const cardList = new Section(createCard, selector);
const userInfo = new UserInfo({ nameSelector, aboutSelector, avatarSelector });

const popupAddCardHandler = ({ name, link }) => {
  popupAddCard.loadingButtonText(true);
  api
    .addCard({ name, link })
    .then((card) => {
      cardList.addItem(createCard(card, userInfo.getUserInfo()));
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.loadingButtonText(false);
    });
};

const popupDeleteCardHandler = (id, removeCard) => {
  popupDeleteCard.loadingButtonText(true);
  api
    .deleteCard(id)
    .then(() => {
      removeCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.loadingButtonText(false);
    });
};

const popupEditAvatarHandler = ({ avatar }) => {
  popupSetAvatar.loadingButtonText(true);
  api
    .setAvatar({ avatar })
    .then((user) => {
      userInfo.setUserInfo(user);
      popupSetAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupSetAvatar.loadingButtonText(false);
    });
};

const popupEditProfileHandler = ({ name, about }) => {
  popupEditProfile.loadingButtonText(true);
  api
    .setUserInfo({ name, about })
    .then((user) => {
      userInfo.setUserInfo(user);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.loadingButtonText(false);
    });
};

const clickImageHandler = ({ link, name }) => {
  popupWithImage.open({ link, name });
};

const clickDeleteHandler = (id, removeCard) => {
  popupDeleteCard.open(id, removeCard);
};

const clickLikeHandler = (id, isLiked, setLike) => {
  if (isLiked) {
    api
      .deleteLike(id)
      .then((card) => {
        setLike(card.likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .putLike(id)
      .then((card) => {
        setLike(card.likes.length);
      })
      .catch((err) => console.log(err));
  }
};

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  popupAddCardHandler,
  "Создать"
);
popupAddCard.setEventListeners();

const popupDeleteCard = new PopupWithConfirmation(
  popupTypeDeleteCard,
  popupDeleteCardHandler
);
popupDeleteCard.setEventListeners();

const popupSetAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  popupEditAvatarHandler
);
popupSetAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  popupEditProfileHandler
);
popupEditProfile.setEventListeners();

function createCard(item) {
  return new Card(
    item,
    userInfo.getUserInfo(),
    "#template-element",
    clickImageHandler,
    clickDeleteHandler,
    clickLikeHandler
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));
