let name = 'Жак-Ив Кусто';
let description = 'Исследователь океана';

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

profileTitle.textContent = name;
profileSubTitle.textContent = description;


let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  popup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

let inputItemName = document.querySelector('#name');
let inputItemDescription = document.querySelector('#description');


inputItemName.value = name;
inputItemDescription.value = description;

function formSubmitHandler(evt) {
  evt.preventDefault();

  name = inputItemName.value;
  description = inputItemDescription.value;

  profileTitle.textContent = name;
  profileSubTitle.textContent = description;

  popupClose();
}

let submitButton = document.querySelector('.popup')
console.log(submitButton);
submitButton.addEventListener('submit', formSubmitHandler);
