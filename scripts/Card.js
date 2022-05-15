
export class Card {
  constructor(imageName, imageLink, cardTemplate, handleCardClick) {
    this._imageName = imageName;
    this._imageLink = imageLink;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._imageLink, this._imageName);
    });
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
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
