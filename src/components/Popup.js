export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener("mouseup", (evt) => {
      if (evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
