const initialCards = [
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


