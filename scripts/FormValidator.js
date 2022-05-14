export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._button = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  resetValidation() {
    this._toggleButtonState(this._inputList, this._button)
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  };

  _validationCheck = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._toggleButtonState();
        this._validationCheck(inputElement);
      }.bind(this));
    });
  };

  _hasInvalidInput = () => {
    return  this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableSubmitButton = () => {
    this._button.classList.add(this._settings.inactiveButtonClass);
    this._button.disabled = true;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._button.classList.remove(this._settings.inactiveButtonClass);
      this._button.disabled = false;
    }
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
