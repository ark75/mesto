export default class Card {
  constructor({name, link}, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
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
      this._handleCardClick(this._link, this._name);
    });
    this._element.querySelector('.element__button-delete')
      .addEventListener('click', () => {
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
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
