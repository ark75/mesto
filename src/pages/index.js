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
  popupProfileJobSelector,
} from "../utils/constants.js";

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo";

const userInfo = new UserInfo({popupProfileNameSelector, popupProfileJobSelector});

const profileValidation = new FormValidator(settings, formProfileEdit);
const addCardValidation = new FormValidator(settings, formAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

function createCard(item) {
  return new Card({name: item.name, link: item.link}, cardTemplate, handleCardClick).generateCard()
}

const imageList = new Section({
    items: initialElements,
    renderer: (item) => {
      const cardElement = createCard({name: item.name, link: item.link});
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
