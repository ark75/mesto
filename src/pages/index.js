import './index.css'; // добавьте импорт главного файла стилей
import {
  settings,
  elementsSelector,
  popupElementNameSelector,
  popupElementPicSelector,
  formSaveName,
  formSavePic,
  profileEdit,
  photoAdd,
  popupBigPictureSelector,
  profileAvatar,
  formSaveAvatar,
  popupElementAvatarSelector,
  profileSelectors,
  popupElementDelete,
  popupInputSelectors,
  popupPictureSelectors,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from '../components/PopupWithDelete';

//КОНСТАНТЫ КЛАССОВ
//
const userInfoClass =  new UserInfo(profileSelectors);
//просмотра изображения
const bigImage = new PopupWithImage(popupBigPictureSelector, popupPictureSelectors);
//запрос карточек с сервера
const apiClass = new Api({
  defaultUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {authorization: 'b7327c08-f984-4f9d-8dde-6738800b3b30', 'Content-Type': 'application/json'}
});

// fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
//   headers: {
//     authorization: '3ccf3527-e147-4624-b15b-88ef9a5a57ad'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
//функция(колбэк) добавления лайка на сервере
function like(idCard, likeCard) {
  return apiClass.setLike(idCard)
    .then((data) => {
      likeCard(data.likes);
    })
    .catch((err) => {
      console.log(`like ошибка: ${err}`)
    })
};

//функция(колбэк) удаления лайка на сервере
function dislike(idCard, likeCard) {
  return apiClass.setDislike(idCard)
    .then((data) => {
      likeCard(data.likes);
    })
    .catch((err) => {
      console.log(`disLike ошибка: ${err}`)
    })
};



//
const cardSection = new Section(
  {renderer: (item) => {

      const cardElement = generateCard(item);
              cardSection.addItem(cardElement);  //  добавляет элемент карточки на страницу
    }
  },
  elementsSelector
);

//функция (колбэк) сборки карточки
const generateCard = (item) => {
  const userId = userInfoClass.getId(); //  получаю ID пользователя
  const newCard = new Card(
    { item,
      userId,
      like: like,
      dislike: dislike,
      handleCardClick: (picName, picURL) => {
        bigImage.open(picName, picURL);
      },
      deleteCardClick: deletePopup
    }
  );
  // console.log(newCard);
  const cardElement = newCard.generateCard();

  return cardElement  //  возвращает собранный элемент карточки для добавления
};
//функция отрисовки карточки на странице
// const handleSection = (defaultCards) =>
// {cardSection
// return cardElements
// }
// реализациия карточки в DOM


Promise.all([apiClass.getUserInfo(), apiClass.getCards()])
  .then(([defaultUser, defaultCards]) => {
    defaultCards.reverse();
    userInfoClass.setUserInfo(defaultUser);

    cardSection.generateCards(defaultCards);

  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных ${err}`);
  });


// открытие и закрытие формы Name
// константа сласса реализации

const popupNameClass = new PopupWithForm (
  {renderer: (data) => {

    handleSaveName (data)}
  },
  settings,
  popupElementNameSelector,
  popupInputSelectors
);
//функция открытия
function handleOpenPopupName() {

  const userData = userInfoClass.getUserInfo();
  //получаю значения полей попапа со страницы
  popupNameClass.setInputValues(userData);  //передаю значения о пользователе в попап
  popupNameClass.open(); //открываю попап
};
//функция (колбэк) закрытия
function handleSaveName (data) {
  popupNameClass.processLoading(true);

  apiClass.editUserInfo(data)
    .then((data) => {

      userInfoClass.setUserInfo(data);
      popupNameClass.close();
      formValidationName.resetValidation();
    })
    .catch((err) => {
      console.log(`Ошибка изменения данных пользователя: ${err}`)
    })
    .finally(() => {
      popupNameClass.processLoading(false);
    })
};


//открытие и закрытие формы редактирования аватара
// константа сласса реализации
const addNewAvatarClass = new PopupWithForm(
  {renderer: (data) => {handleSaveAvatar(data)}},
  settings,
  popupElementAvatarSelector,
  popupInputSelectors
);
//открытие попапа
function handleOpenPopupAvatar() {
  addNewAvatarClass.open(); //открываю попап
  formValidationAvatar.resetValidation();
};
//закрытие (колбэк) попапа
function handleSaveAvatar(data) {
  addNewAvatarClass.processLoading(true);
  apiClass.editAvatar(data)
    .then((data) => {
      userInfoClass.setUserInfo(data);
      addNewAvatarClass.close();
      formValidationName.resetValidation();
    })
    .catch((err) => {
      console.log(`Ошибка изменения аватарки: ${err}`)
    })
    .finally(() => {
      addNewAvatarClass.processLoading(false);

    })
};

// открытие и закрытие формы Pic
// константа сласса реализации добавления новой карточки
const addNewCardClass = new PopupWithForm (
  {renderer: (data) => {handleSavePic(data)}},
  settings,
  popupElementPicSelector,
  popupInputSelectors
);
//функция открытия
function handleOpenPopupPic() {
  addNewCardClass.open();
};
//функция (колбэк) закрытия
function handleSavePic(data) {
  addNewCardClass.processLoading(true);
  console.log(data);
  apiClass.createUserCard(data)
    .then((card) => {
      const cardElement = generateCard(card);  //  получаю собранный элемент карточки
      cardSection.addItem(cardElement);  //  добавляет элемент карточки на страницу
      // cardSection.generateCards([card]);
      addNewCardClass.close();
      formValidationPic.resetValidation();
    })
    .catch((err) => {
      console.log(`Ошибка загрузки ккарточки: ${err}`)
    })
    .finally(() => {
      addNewCardClass.processLoading(false);
    })
};

//удаления карточки
const popupDeleteClass = new PopupWithDelete({deleteCards}, settings, popupElementDelete);
//
function deletePopup(cardItem) {
  popupDeleteClass.setCard(cardItem);
  popupDeleteClass.open();
};
//функция(колбэк) удаления лайка на сервере
function deleteCards(idCard) {
  popupDeleteClass.renderLoadingDelete(true);
  apiClass.deleteUserCard(idCard)
    .then(() => {
      const cardItem = popupDeleteClass.getCard();
      cardItem.deleteCard();
      popupDeleteClass.close();
    })
    .catch((err) => {
      console.log(`ошибка удаления карточки ${err}`);
    })
    .finally(() => {
      popupDeleteClass.renderLoadingDelete(false);
    })
}

//запускаю проверки форм ввода
const formValidationName = new FormValidator(settings, formSaveName); //для формы Name
formValidationName.enableValidation();
const formValidationPic = new FormValidator(settings, formSavePic); //длля формы Pic
formValidationPic.enableValidation();
const formValidationAvatar = new FormValidator(settings, formSaveAvatar); //длля формы Avatar
formValidationAvatar.enableValidation();


//слушаю клики по кнопкам открыть окно
profileEdit.addEventListener("click", handleOpenPopupName); //для формы Name
photoAdd.addEventListener("click", handleOpenPopupPic); //для формы Pic
profileAvatar.addEventListener("click", handleOpenPopupAvatar); //для формы  Avatar
//слушаю клики на кнопку закрытия и сохранения
popupNameClass.setEventListeners();
addNewCardClass.setEventListeners();
addNewAvatarClass.setEventListeners();
popupDeleteClass.setEventListeners();
bigImage.setEventListeners();
