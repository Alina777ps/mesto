export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._selectorPopup.classList.add("popup_opened");

    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._selectorPopup.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
          }
        }

    setEventListeners() {
        this._selectorPopup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
            if (evt.target.classList.contains("popup__close-icon")) {
                this.close();
            }
          });
    } 
}

