export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._setEventListeners = this._setEventListeners.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("mousedown", this._setEventListeners);
        this._selectorPopup.classList.add("popup_opened");
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("mousedown", this._setEventListeners);
        this._selectorPopup.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
          }
        }

   _setEventListeners(evt) {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
            if (evt.target.classList.contains("popup__close-icon")) {
                this.close();
            }
          };
        
}

