const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form')
const inputItemName = popupForm.querySelector('#name');
const inputItemDescription = popupForm.querySelector('#description');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  inputItemName.value = profileTitle.textContent;
  inputItemDescription.value = profileSubTitle.textContent;
  popup.classList.add('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputItemName.value;
  profileSubTitle.textContent = inputItemDescription.value;
  popupClose();
}

profileEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);
