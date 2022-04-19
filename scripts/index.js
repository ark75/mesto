const initialElements = [
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
const popupProfile = document.querySelector('.popup_type_profile-edit');
const profileElement = popupProfile.querySelector('.popup__form_profile');
const inputName = profileElement.querySelector('.popup__item_input-name');
const inputJob = profileElement.querySelector('.popup__item_input-job');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button_profile');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupNewElement = document.querySelector('.popup_type_new-element');
const imageElement = popupNewElement.querySelector('.popup__form');
const inputImageTitle = imageElement.querySelector('.popup__item_input-image-title');
const inputImageLink = imageElement.querySelector('.popup__item_input-image-link');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButtonElement = popupNewElement.querySelector('.popup__close-button_new-element');

const popupImage = document.querySelector('.popup_type_image');
const imageCloseButton = popupImage.querySelector('.popup__close-button_type-image');
const imageTitle = popupImage.querySelector('.popup__image-title');
const imageInfo = popupImage.querySelector('.popup__image');

const initialElementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;


function openForm(popupName) {
  popupName.classList.add('popup_opened');
}

function closeForm(popupName) {
  popupName.classList.remove('popup_opened');
}

function openProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openForm(popupProfile);
}

function openElement() {
  inputImageTitle.value = '';
  inputImageLink.value = '';
  openForm(popupNewElement);
}

function openImage(element) {
  imageInfo.src = element.link;
  imageInfo.alt = element.name;
  imageTitle.textContent = element.name;
  openForm(popupImage);
}

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeForm(popupProfile);
}

function newCard(element) {
  const newElement = elementTemplate.cloneNode(true);
  const imageElement = newElement.querySelector('.element__image');
  const elementButtonDelete = newElement.querySelector('.element__button-delete');
  const elementButtonLike = newElement.querySelector('.element__like-icon');
  console.log(elementButtonLike);
  imageElement.src = element.link;
  imageElement.alt = element.name;
  newElement.querySelector('.element__title').textContent = element.name;

  elementButtonDelete.addEventListener('click', removeElement);
  elementButtonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-icon_active');
  });

  imageElement.addEventListener('click', () => openImage(element));

  return newElement;
}

document.querySelector('.element__like-icon').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-icon_active');
});

function removeElement(evt) {
  const element = evt.target.closest(".element");
  element.remove();
}

function renderCard(evt) {
  evt.preventDefault();
  const newElement = {name: inputImageTitle.value, link: inputImageLink.value};
  initialElementList.prepend(newCard(newElement));
  closeForm(popupNewElement);
}

initialElements.forEach(element => {
  initialElementList.prepend(newCard(element));
});

profileEditButton.addEventListener('click', () => openProfile());
closeButtonProfile.addEventListener('click', () => closeForm(popupProfile));
profileElement.addEventListener('submit', submitProfile);

addButton.addEventListener('click', () => openElement());
popupCloseButtonElement.addEventListener('click', () => closeForm(popupNewElement));
imageElement.addEventListener('submit', renderCard);
imageCloseButton.addEventListener('click', () => closeForm(popupImage));
