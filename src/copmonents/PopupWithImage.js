import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }

    open(name, link) {
        super.open();
        this._cardImage = document.querySelector('.popup__mask-group');
        
        this._cardImage.src = link;
        this._cardImage.alt = name;
        document.querySelector('.popup__caption').textContent = name;
    }
}
