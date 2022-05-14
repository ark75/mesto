import { Card, initialElements } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupProfile = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfile.querySelector('.popup__form_profile');
const nameInput = formProfileEdit.querySelector('.popup__item_input-name');
const jobInput = formProfileEdit.querySelector('.popup__item_input-job');
const buttonProfileCloseSign = popupProfile.querySelector('.popup__close-button_profile');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupNewElement = document.querySelector('.popup_type_new-element');
const formAddCard = popupNewElement.querySelector('.popup__form_new-element');
const imageTitleInput = formAddCard.querySelector('.popup__item_input-image-title');
const imageLinkInput = formAddCard.querySelector('.popup__item_input-image-link');


const buttonAdd = document.querySelector('.profile__add-button');
const popupCloseButtonElement = popupNewElement.querySelector('.popup__close-button_new-element');

const popupImage = document.querySelector('.popup_type_image');
const imageCloseButton = popupImage.querySelector('.popup__close-button_type-image');
const imageTitle = popupImage.querySelector('.popup__image-title');
const pictureInfo = popupImage.querySelector('.popup__image');

const cardTemplate = "#element";
const elementsList = document.querySelector('.elements');

const settings ={
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
};

const profileValidation = new FormValidator(settings, formProfileEdit);
const addCardValidation = new FormValidator(settings, formAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

function render(elementsList, Card) {
  elementsList.prepend(Card);
}

initialElements.forEach((item) => {
  const newElement = new Card (item.name, item.link, cardTemplate).generateCard();
  render(elementsList, newElement);
});

export function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popupName.addEventListener('mousedown', closeByOverlay);
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeForm(evt.target);
  }
}
function closeForm(popupName) {
  profileValidation.resetValidation();
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  popupName.removeEventListener('mousedown', closeByOverlay);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closeForm(openedPopup);
    }
}

function openProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function openFormAddCard() {
  formAddCard.reset();
  addCardValidation.disableSubmitButton();
  openPopup(popupNewElement);
}

export function openImage(link, name) {
  pictureInfo.src = link;
  pictureInfo.alt = name;
  imageTitle.textContent = name;
  openPopup(popupImage);
}

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeForm(popupProfile);
}

function submitNewElement(evt) {
  evt.preventDefault();
  const newElement = new Card(imageTitleInput.value, imageLinkInput.value, cardTemplate).generateCard();
  render(elementsList, newElement);
  closeForm(popupNewElement);
}

profileEditButton.addEventListener('click', () => openProfile());
buttonProfileCloseSign.addEventListener('click', () => closeForm(popupProfile));
formProfileEdit.addEventListener('submit', submitProfile);
buttonAdd.addEventListener('click', () => openFormAddCard());
popupCloseButtonElement.addEventListener('click', () => closeForm(popupNewElement));
formAddCard.addEventListener('submit', submitNewElement);
imageCloseButton.addEventListener('click', () => closeForm(popupImage));
