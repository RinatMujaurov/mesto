const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = popupElement.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_about');




const openPopup = function() {
	popupElement.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
}

const closePopup = function() {
	popupElement.classList.remove('popup_opened');
}

// Обработчик событий по клику
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