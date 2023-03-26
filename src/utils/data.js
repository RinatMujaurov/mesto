export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//массив с карточками
export const initialCards = [
  {
    name: 'Морокко',
    link: 'https://images.unsplash.com/photo-1528657249085-c569d3c869e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80'
  },
  {
    name: 'Германия',
    link: 'https://images.unsplash.com/photo-1603787935137-58167f55336f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'
  },
  {
    name: 'Португалия',
    link: 'https://images.unsplash.com/photo-1562250883-39d8b01616c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
  },
  {
    name: 'Турция',
    link: 'https://images.unsplash.com/photo-1619965342156-8e28c92028e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Австралия',
    link: 'https://images.unsplash.com/photo-1546268060-2592ff93ee24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Сингапур',
    link: 'https://images.unsplash.com/photo-1531787127767-5f714b6959dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=993&q=80'
  }
];

// переменные
export const selector = ('.elements');
export const profileOpenButton = document.querySelector('.profile__edit-button');
export const formElementProfile = document.forms['profile-info'];
export const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
export const formElementCard = document.forms['element'];
export const popupImage = '.popup_type_image';
export const popupAddCardSelector = '.popup_type_element';
export const popupEditProfileSelector = '.popup_type_profile';
export const nameSelector = '.profile__name';
export const aboutSelector = '.profile__about';
