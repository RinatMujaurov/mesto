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

//темплейт
const elements = document.querySelector(".elements");
const template = document.querySelector("#template-element").content.querySelector('.element');

//карточки
const element = document.querySelector('.element');
const elementImage = document.querySelector('.element__image');
const elementDeleteButton = document.querySelector('.element__delete-button');
const elementTitle = document.querySelector('.element__title');
const elementLike = document.querySelector('.element__like');

//попап редактирования профиля
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseButtonElement = document.querySelector('.popup__close-button_type_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElementProfile = popupElementProfile.querySelector('.popup__form_type_profile');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let nameInput = formElementProfile.querySelector('.popup__input_data_name');
let jobInput = formElementProfile.querySelector('.popup__input_data_about');

//попап добавления карточки
const popupElement = document.querySelector('.popup_type_element');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseAddButtonElement = document.querySelector('.popup__close-button_type_element');
const formElementCard = document.querySelector('.popup__form_type_element');
const inputCardLink = document.querySelector('.popup__input_data_link');
const inputCardTitle = document.querySelector('.popup__input_data_title');

//попап картинки
const popupImage = document.querySelector('.popup_type_image')
const popupImageElement = document.querySelector('.popup__image');
const popupImageElementTitle = document.querySelector('.popup__title_type_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button_type_image');

//вывод карточек на страницу

function renderCards(items) {
  const cards = items.map((item) => {
      return createCard({ name: item.name, link: item.link })
  })
  elements.append(...cards);
}

renderCards(initialCards);

function createCard(item) {
  const card = template.cloneNode(true);
  const elementImage = card.querySelector('.element__image');
  elementImage.src = item.link;
  elementImage.alt = item.name;

  card.querySelector('.element__title').textContent = item.name;

  card.querySelector('.element__delete-button').addEventListener('click', () => {
      card.remove();
  });

  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active')
});

elementImage.addEventListener('click', () => {
  popupImageElement.src = item.link;
  popupImageElement.alt = item.name;
  popupImageElementTitle.textContent = item.name;

  openPopupImage();
});

  return card;
}

//открытие/закрытие попапа изображения
function openPopupImage() {
  popupImage.classList.add('popup_opened')
}

const closePopupImage = function() {
  popupImage.classList.remove('popup_opened')
}

popupImageCloseButton.addEventListener('click', closePopupImage);


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

function handlerFormSubmitCard(evt) {
  evt.preventDefault();

  const card = createCard({ name: inputCardTitle.value, link: inputCardLink.value })

  elements.prepend(card);

  closePopup();
  inputCardTitle.value = '';
  inputCardLink.value = '';
}
//отправка формы
formElementProfile.addEventListener('submit', handleFormSubmit);
formElementCard.addEventListener('submit', handlerFormSubmitCard);


