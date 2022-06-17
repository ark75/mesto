//селекторы и классы
export const cardTemplate = "#card-template";
export const popupOpenedClass = "popup_opened";
export const elementsSelector = ".elements";
export const popupElementNameSelector = ".popup_type_profile-edit";
export const popupElementPicSelector = ".popup_type_new-element";
export const popupBigPictureSelector = ".popup_type_image";
export const popupElementAvatarSelector = '.popup_type_avatar';
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
};

export const elements = document.querySelector(".elements"); //темплейт карточек
export const popupSelectorAll = document.querySelectorAll(".popup"); //объявляю все попапы

//обьявляю попап изменения иконки профиля (avatar)
export const popupElementAvatar = document.querySelector(".popup_type_avatar");
export const formSaveAvatar = popupElementAvatar.querySelector(".popup__form"); //фома изменения аватара (avatar)
//
export const popupInputSelectors = {
  popupNameSelector: ".popup__item_input-name",
  popupWorkSelector: ".popup__item_input-job",
  popupAvatarSelector: ".popup__input_type_avatar",
  popupPicNameSelector: ".popup__item_input-image-title",
  popupPicUrlSelector: ".popup__item_input-image-link"
}
//обьявляю попап изменения имени/работы (name)
export const popupElementEditBio = document.querySelector(".popup_type_profile-edit");
//поля карточки изменения имени/работы (name)
export const formSaveName = popupElementEditBio.querySelector(".popup__form"); //форма изменения имени/работы (name)
//поля вывода имени/работы в форме (name)

//обьявляю попап добавления карточки (pic)
export const popupElementEditPic = document.querySelector(".popup_type_new-element");
//поля формы добавления карточки (pic)
export const formSavePic = popupElementEditPic.querySelector(".popup__form"); //фома добавления карточки (pic)

//обьявляю попап фото
export const popupBigPicture = document.querySelector(".popup_type_image");//
//поля вывода просмотра фото
export const popupPictureSelectors = {
  pictureImgSelector: ".popup__image",
  pictureTextSelector: ".popup__image-title"
}
export const pictureImg = popupBigPicture.querySelector(".popup__image");//
export const pictureText = popupBigPicture.querySelector(".popup__image-title");//

//попап подтверждения удаления
export const popupElementDelete = '.popup_type_delete';

//кнопки открытия форм
export const profileEdit = document.querySelector(".profile__edit-button");//
export const photoAdd = document.querySelector(".profile__add-button");//
export const profileAvatar = document.querySelector('.profile__button-avatar')

export const profileSelectors = {
  name: '.profile__title',
  work: '.profile__job',
  avatar: '.profile__avatar'
}
