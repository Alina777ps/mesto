import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, sabmitForm) {
        super(selectorPopup);
        this._sabmitForm = sabmitForm;
        //this._form = document.forms.this._selectorPopup;
        this._form = this._selectorPopup.querySelector(".popup__form");
        this._inputs = Array.from(document.querySelectorAll(".popup__input"));
    }
//собирает данные всех полей формы
    _getInputValues() {
        this._inputValues = {}
        this._inputs.forEach((input) => {
            this._inputValues[input.name] = input.value
          })
          return this._inputValues
    }

    setEventListeners() {
        super.setEventListeners();
        //обработчик сабмита формы
        this._form.addEventListener("submit", (event) => {
            event.preventDefault()
      
            this._sabmitForm(this._getInputValues());
            this.close()
          })
        }

    close() {
        super.close();
        this._form.reset();
    }
}