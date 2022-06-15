export default class Card {
  constructor({item}, cardTemplate, handleCardClick, deleteCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
      this._id = item._id;  //  ID - карточки
      this._ownerId = item.owner._id; //  ID - владелец карточки
      this._userId = userId;  //  ID - мой
      this._like = like;  //  колбэк лайков
      this._dislike = dislike;  //  колбэк дизлайков
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick  //колбэк удаления карточки
  }
  _checkId() {
    const isLikeUser = this._likes.find(user => user._id === this._userId)
    return isLikeUser
  }
  _toggleLikeButton() {
    if (this._checkId()) {  //если мой ID есть в лайках
      this._dislike(this._id, this._handleLikeClick);
    } else {
      this._like(this._id, this._handleLikeClick);
    }
  };

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

  _deleteButton() {
    if (this._userId !== this._ownerId) {
      this._elementTrash.style.display = 'none';
    }
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeClick(like) {
    this._likes = like;
    this._handleLikeCard();
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLike = this._element.querySelector('.element__like-icon');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._elementTrash = this._element.querySelector('.element__trash');


    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }


}
