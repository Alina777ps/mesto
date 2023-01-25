export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._buttonSave = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));   
    }

    //показать ошибку ввода
_showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
}
//скрыть ошибку ввода
_hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
}
//проверка правильности ввода
_checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
    } else {
        this._showInputError(inputElement);
    }
}
//невалидный ввод
_hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
}

//очистка ошибок и управление кнопкой 
resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
  })
}

//перключатель состояния кнопки
_toggleButtonState() {
    if (this._hasInvalidInput()) {
        this._buttonSave.classList.add(this._config.inactiveButtonClass);
        this._buttonSave.disabled = true;
    } else {
        this._buttonSave.classList.remove(this._config.inactiveButtonClass);
        this._buttonSave.disabled = false;
    }
}
//прослушиватеь событий
_setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        })
    })
}
//включить валидацию
enableValidation() {
    this._setEventListeners();
}

}



  
  
  