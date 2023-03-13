import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from './initialCards.js';
import options from './options.js';

const elementsContainer = document.querySelector('.elements');

//общий попап
const popupAll = Array.from(document.querySelectorAll('.popup'));

//попап редактирования профиля
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElementProfile = popupElementProfile.querySelector('.popup__form_type_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const nameInput = formElementProfile.querySelector('.popup__input_data_name');
const jobInput = formElementProfile.querySelector('.popup__input_data_about');

//попап добавления карточки
const popupElementCard = document.querySelector('.popup_type_element');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formElementCard = document.querySelector('.popup__form_type_element');
const inputCardLink = document.querySelector('.popup__input_data_link');
const inputCardTitle = document.querySelector('.popup__input_data_title');

const profileFormValidate = new FormValidator(options, formElementProfile);
const cardFormValidate = new FormValidator(options, formElementCard);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

//вывод карточек на страницу
function renderInitialCards(cardElements) {
  elementsContainer.append(
      ...cardElements.map((cardElement) => {
          return createCard(cardElement);
      })
  );
}
renderInitialCards(initialCards);

function createCard(item) {
  const cardElement = new Card(item.name, item.link, '#template-element', openPopup).generateCard();
  return cardElement;
}

// открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// Открытие попапа профиля
function openPopupProfileOnClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupElementProfile);
  profileFormValidate.resetValidation();
}

popupOpenButtonElement.addEventListener('click', openPopupProfileOnClick);

//открытие попапа элемента
function openPopupCardOnClick() {
  openPopup(popupElementCard);
  cardFormValidate.toggleButtonState();
  cardFormValidate.resetValidation();
}

popupOpenAddButtonElement.addEventListener('click', openPopupCardOnClick);

//Закрытие всех попапов
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//функция закрытия попапа по нажатию на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрытие попапов по нажатию на оверлей
popupAll.forEach((popupEl) => {
  popupEl.addEventListener('mouseup', (event) => {
    const closePopupByClickOnOverlay = event.target.classList;
    if (closePopupByClickOnOverlay.contains('popup') || closePopupByClickOnOverlay.contains('popup__close')) {
      closePopup(popupEl);
    }
  });
});

//ввод данных
function handleFormSubmitProfile(evt) {
	evt.preventDefault();

	profileJob.textContent = jobInput.value;
	profileName.textContent = nameInput.value;

	closePopup(popupElementProfile);
}


function handlerFormSubmitCard(evt) {
  evt.preventDefault();

  elementsContainer.prepend(createCard({ name: inputCardTitle.value, link: inputCardLink.value }));

  closePopup(popupElementCard);

  evt.target.reset();
  cardFormValidate.toggleButtonState();
}

//отправка формы
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
formElementCard.addEventListener('submit', handlerFormSubmitCard);


