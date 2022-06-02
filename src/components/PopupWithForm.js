import {settings} from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElementSelector, handleSubmitForm) {
    super(popupElementSelector);
      this._handleSubmit = handleSubmitForm;
      this._popupElement = document.querySelector(popupElementSelector);
      this._popupForm = this._popupElement.querySelector(settings.formSelector);
      this._inputList = this._popupElement.querySelectorAll(settings.inputSelector)
  };

  _getInputValues = () => {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value
    })
    return this._inputValues
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  };

  close() {
    this._popupForm.reset();
    super.close();
  };
}
