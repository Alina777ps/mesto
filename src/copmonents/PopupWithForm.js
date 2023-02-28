import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, sabmitForm) {
        super(selectorPopup);
        this._sabmitForm = sabmitForm;
        this._form = this._selectorPopup.querySelector(".popup__form");
        this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
        this._form.addEventListener("submit", (event) => {
          event.preventDefault()
          const loadingText = event.submitter.textContent
          event.submitter.textContent = "Сохранение..."
          this._sabmitForm(this._getInputValues())
            .then(() => this.close())
            .finally(() => {
              event.submitter.textContent = loadingText
            })
        })
    }
    _getInputValues() {
        this._inputValues = {}
        this._inputs.forEach((input) => {
            this._inputValues[input.name] = input.value
          })
          return this._inputValues
    }
   
    close() {
        super.close();
        this._form.reset();
    }

}