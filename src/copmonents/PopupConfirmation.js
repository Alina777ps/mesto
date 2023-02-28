import Popup from "./Popup.js"

export default class PopupConfirmation extends Popup {
  constructor(popup, handleSubmit) {
    super(popup)
    this._handleSubmit = handleSubmit
    this._form = this._selectorPopup.querySelector(".popup__form")
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this._handleSubmit(this._card)
    })
  }

  open(card) {
    this._card = card
    super.open()
  }
}
