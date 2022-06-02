export const initialElements = [
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
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
};
export const popupImage = document.querySelector('.popup_type_image');
export const imageTitle = popupImage.querySelector('.popup__image-title');
export const pictureInfo = popupImage.querySelector('.popup__image');
export const popupProfile = document.querySelector('.popup_type_profile-edit');
export const formProfileEdit = popupProfile.querySelector('.popup__form_profile');
export const nameInput = formProfileEdit.querySelector('.popup__item_input-name');
export const jobInput = formProfileEdit.querySelector('.popup__item_input-job');

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__job');
export const profileEditButton = document.querySelector('.profile__edit-button');

export const popupNewElement = document.querySelector('.popup_type_new-element');
export const formAddCard = popupNewElement.querySelector('.popup__form_new-element');
export const buttonAdd = document.querySelector('.profile__add-button');



export const elementSelector ='.elements';
export const buttonDeleteSelector ='.element__button-delete';
export const imageSelector ='.element__image';
export const likeIconToggleToken ='element__like-icon_active';
export const elementTextSelector ='.element__text';
export const likeIconSelector ='element__like-icon';
export const popupProfileSelector ='.popup_type_profile-edit';
export const popupImageSelector ='.popup_type_image';
export const popupAddCardSelector ='.popup_type_new-element';
export const popupProfileNameSelector ='.profile__title';
export const popupProfileJobSelector ='.profile__job';
export const cardTemplate = "#element";

