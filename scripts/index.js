const popupProfile = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfile.querySelector('.popup__form_profile');
const inputName = formProfileEdit.querySelector('.popup__item_input-name');
const inputJob = formProfileEdit.querySelector('.popup__item_input-job');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button_profile');

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


function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closeForm(popupName) {
  popupName.classList.remove('popup_opened');
}

function openProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
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
imageCloseButton.addEventListener('click', () => closeForm(popupImage));
