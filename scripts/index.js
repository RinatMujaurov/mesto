const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector(".elements");
const template = document.querySelector("#template-element").content;

const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseButtonElement = document.querySelector('.popup__close-button_type_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = popupElementProfile.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let nameInput = formElement.querySelector('.popup__input_data_name');
let jobInput = formElement.querySelector('.popup__input_data_about');

const popupElement = document.querySelector('.popup_type_element');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseAddButtonElement = document.querySelector('.popup__close-button_type_element')

//вывод карточек на страницу
const cardsInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  cardsInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  const card = template
    .querySelector(".element")
    .cloneNode(true);
  card.querySelector(".element__title").textContent = name;
  card.querySelector(".element__image").src = link;

  elements.prepend(card);
}

render();

//попап редактирования профиля
function openPopup() {
  popupElementProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const closePopup = function() {
	popupElementProfile.classList.remove('popup_opened');
}

//попап добавление картинок
function openPopupElement() {
  popupElement.classList.add('popup_opened');
}

const closePopupElement = function() {
	popupElement.classList.remove('popup_opened');
}


// Обработчик событий по клику
popupOpenAddButtonElement.addEventListener('click', openPopupElement);
popupCloseAddButtonElement.addEventListener('click', closePopupElement);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


//ввод данных

function handleFormSubmit(evt) {
	evt.preventDefault();

	profileJob.textContent = jobInput.value;
	profileName.textContent = nameInput.value;

	closePopup();
}

//отправка формы
formElement.addEventListener('submit', handleFormSubmit);
