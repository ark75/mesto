import {popupImage, pictureInfo} from '../utils/constants.js';
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
      this._popupImage = popupImage;
      this._imageTitle = pictureInfo
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._imageTitle.textContent = name;
    super.open();
  }
}
