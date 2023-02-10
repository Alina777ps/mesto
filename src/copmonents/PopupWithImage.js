import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }

    open(popupImage, popupTitle) {
        super.open();
        this._cardImage = document.querySelector('.element__mask-group');
        
        popupImage.src = this._cardImage.src;
        popupTitle.alt = this._cardImage.alt;
        popupTitle.textContent = document.querySelector('.element__title').textContent;
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners()
    }

}
