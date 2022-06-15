import './index.css';
import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  initialElements,
  settings,
  formProfileEdit,
  formAddCard,
  cardTemplate,
  nameInput,
  jobInput,
  profileEditButton,
  buttonAdd,
  pictureInfo,
  imageTitle,
  elementSelector,
  popupImageSelector,
  popupProfileSelector,
  popupAddCardSelector,
  popupProfileNameSelector,
  popupProfileJobSelector, popupPictureSelectors,
} from "../utils/constants.js";


import Api from "../components/Api.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo";
import PopupWithDelete from '../components/PopopWithDelete.js';

const userInfo = new UserInfo({popupProfileNameSelector, popupProfileJobSelector});
const bigImage = new PopupWithImage(popupImageSelector, popupPictureSelectors);

const profileValidation = new FormValidator(settings, formProfileEdit);
const addCardValidation = new FormValidator(settings, formAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

const apiClass = new Api({
  defaultUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {authorization: '3ccf3527-e147-4624-b15b-88ef9a5a57ad', 'Content-Type': 'application/json'}
});


function createCard(item) {
  return new Card({name: item.name, link: item.link}, cardTemplate, handleCardClick).generateCard()
}
function like(idCard, likeCard) {
  return apiClass.setLike(idCard)
    .then((data) => {
      likeCard(data.likes);
    })
    .catch((err) => {
      console.log(`like ошибка: ${err}`)
    })
};

function dislike(idCard, likeCard) {
  return apiClass.setDislike(idCard)
    .then((data) => {
      likeCard(data.likes);
    })
    .catch((err) => {
      console.log(`disLike ошибка: ${err}`)
    })
};

const imageList = new Section({
        renderer: (items) => {
      const cardElement = createCard({items});
      imageList.addItem(cardElement);
    }
  },
  elementSelector);
imageList.generateCards();

const profilePopup = new PopupWithForm(popupProfileSelector, (profileData) => {
  userInfo.setUserInfo(profileData);
  profilePopup.close();
});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupAddCardSelector, (inputData) => {
  const newCardData = {
    name: inputData.title,
    link: inputData.description
  };
  imageList.addItem(createCard(newCardData));
  addCardPopup.close();
  addCardValidation.resetValidation();
});
addCardPopup.setEventListeners();

function handleCardClick(link, name) {
  pictureInfo.src = link;
  pictureInfo.alt = name;
  imageTitle.textContent = name;
  imagePopup.open(name, link);
}

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profilePopup.open()
});

buttonAdd.addEventListener('click', () => addCardPopup.open());
