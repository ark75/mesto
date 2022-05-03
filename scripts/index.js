const popupProfile = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfile.querySelector('.popup__form_profile');
const inputName = formProfileEdit.querySelector('.popup__item_input-name');
const inputJob = formProfileEdit.querySelector('.popup__item_input-job');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button_profile');

const popupList = document.querySelectorAll('.popup');
const formList = document.querySelectorAll('.popup__form');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupNewElement = document.querySelector('.popup_type_new-element');
const formAddCard = popupNewElement.querySelector('.popup__form');
const inputImageTitle = formAddCard.querySelector('.popup__item_input-image-title');
const inputImageLink = formAddCard.querySelector('.popup__item_input-image-link');


const addButton = document.querySelector('.profile__add-button');
const popupCloseButtonElement = popupNewElement.querySelector('.popup__close-button_new-element');

const popupImage = document.querySelector('.popup_type_image');
const imageCloseButton = popupImage.querySelector('.popup__close-button_type-image');
const imageTitle = popupImage.querySelector('.popup__image-title');
const pictureInfo = popupImage.querySelector('.popup__image');

const initialElementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;

function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach(element => {
    element.addEventListener('input', (event) => handleFormInput(event, form, config));
  })

  form.addEventListener('submit', (event) => handleFormSubmit(event, form));
  toggleButton(form, config);
}

function toggleButton(form, config) {
  const button = form.querySelector(config.buttonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__button_disabled', !form.checkValidity());
}

function handleFormSubmit(event) {
  event.preventDefault();
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
  }
  toggleButton(form, config);
}


function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  removeErrorMessage();
  document.addEventListener('keydown', (evt) => closePopupByEsc(evt, popupName));
}

function closeForm(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt, popupName) {
  if (evt.key === 'Escape') {
    closeForm(popupName);
  }
}

function removeErrorMessage() {
  const error = document.querySelectorAll('.popup__input-error');
  error.forEach(error => {
    error.textContent = '';
  })
}

function openProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  enableValidation({
    formSelector: '.popup__form_profile',
    inputSelector: '.popup__item',
    buttonSelector: '.popup__button',
  })
  openPopup(popupProfile);
}

function openFormAddCard() {
  inputImageTitle.value = '';
  inputImageLink.value = '';
  enableValidation({
    formSelector: '.popup__form_new-element',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
  })
  openPopup(popupNewElement);
}

function openImage(element) {
  pictureInfo.src = element.link;
  pictureInfo.alt = element.name;
  imageTitle.textContent = element.name;
  openPopup(popupImage);
}

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeForm(popupProfile);
}

function toggleLikeButton(evt) {
  evt.target.classList.toggle('element__like-icon_active');
}

function createNewElement(element) {
  const newElement = elementTemplate.cloneNode(true);
  const imageElement = newElement.querySelector('.element__image');
  const elementButtonDelete = newElement.querySelector('.element__button-delete');
  const elementButtonLike = newElement.querySelector('.element__like-icon');

  imageElement.src = element.link;
  imageElement.alt = element.name;
  newElement.querySelector('.element__text').textContent = element.name;
  elementButtonDelete.addEventListener('click', removeElement);
  elementButtonLike.addEventListener('click', toggleLikeButton);
  imageElement.addEventListener('click', () => openImage(element));
  return newElement;
}

function addByEnter(evt) {
  if (evt.key === 'Enter') {
    submitNewElement(evt);
  }
}

function removeElement(evt) {
  const element = evt.target.closest(".element");
  element.remove();
}

function submitNewElement(evt) {
  evt.preventDefault();
  const newElement = {name: inputImageTitle.value, link: inputImageLink.value};
  initialElementList.prepend(createNewElement(newElement));
  closeForm(popupNewElement);
}

initialElements.forEach(element => initialElementList.prepend(createNewElement(element)));
profileEditButton.addEventListener('click', () => openProfile());
closeButtonProfile.addEventListener('click', () => closeForm(popupProfile));
formProfileEdit.addEventListener('submit', submitProfile);
addButton.addEventListener('click', () => openFormAddCard());
popupCloseButtonElement.addEventListener('click', () => closeForm(popupNewElement));
formAddCard.addEventListener('submit', submitNewElement);
inputImageTitle.addEventListener('keydown', addByEnter);
inputImageLink.addEventListener('keydown', addByEnter);
imageCloseButton.addEventListener('click', () => closeForm(popupImage));
popupList.forEach(popup => popup.addEventListener('click', () => closeForm(popup)));
formList.forEach(form => form.addEventListener('click', (event) => event.stopPropagation()));
pictureInfo.addEventListener('click', (event) => event.stopPropagation());

enableValidation({
  formSelector: '.popup__form_profile',
  inputSelector: '.popup__item',
  buttonSelector: '.popup__button',
})

enableValidation({
  formSelector: '.popup__form_new-element',
  inputSelector: '.popup__item',
  buttonSelector: '.popup__button',
})
