const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const inputItemName = document.querySelector('#name');
const inputItemDescription = document.querySelector('#description');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  popup.classList.add('popup_opened');
  inputItemName.value = profileTitle.textContent;
  inputItemDescription.value = profileSubTitle.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputItemName.value;
  profileSubTitle.textContent = inputItemDescription.value;
  popupClose();
}

profileEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('submit', formSubmitHandler);
