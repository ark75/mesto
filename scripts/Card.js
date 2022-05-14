import {openImage} from './index.js';

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

export class Card {
  constructor(imageName, imageLink, cardTemplate) {
    this._imageName = imageName;
    this._imageLink = imageLink;
    this._cardTemplate = cardTemplate;
    this._handleOpenImage = openImage;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._imageName, this._imageLink);
    });
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  _handleImageClick() {
    this._handleOpenImage(this._imageLink, this._imageName);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle("element__like-icon_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLike = this._element.querySelector('.element__like-icon');
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageName;
    this._element.querySelector(".element__text").textContent = this._imageName;
    this._setEventListeners();
    return this._element;
  }
}
