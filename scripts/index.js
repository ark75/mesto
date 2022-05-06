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

const initialElementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;


function openPopup(popupName) {
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
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
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

function removeElement(evt) {
  const element = evt.target.closest(".element");
  element.remove();
}

function submitNewElement(evt) {
  evt.preventDefault();
  const newElement = {name: imageTitleInput.value, link: imageLinkInput.value};
  initialElementList.prepend(createNewElement(newElement));
  closeForm(popupNewElement);
}

initialElements.forEach(element => initialElementList.prepend(createNewElement(element)));
profileEditButton.addEventListener('click', () => openProfile());
buttonProfileCloseSign.addEventListener('click', () => closeForm(popupProfile));
formProfileEdit.addEventListener('submit', submitProfile);
buttonAdd.addEventListener('click', () => openFormAddCard());
popupCloseButtonElement.addEventListener('click', () => closeForm(popupNewElement));
formAddCard.addEventListener('submit', submitNewElement);
imageCloseButton.addEventListener('click', () => closeForm(popupImage));


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
});
