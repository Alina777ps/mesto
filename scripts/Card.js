export class Card {
    constructor(data, templateElement, openPopupImage) {
        this._title = data.title;
        this._image = data.image;
        this._templateElement = templateElement;
        this._openPopupImage = openPopupImage
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateElement)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element__mask-group').src = this._image;
        this._element.querySelector('.element__mask-group').alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;
    
        return this._element;
      }
      
      _setEventListeners() {
        this._element.querySelector(".element__trash").addEventListener("click", () => {
            this._element.remove();
        });
        this._element.querySelector('.element__like-button').addEventListener("click", (event) => {
            event.target.classList.toggle("element__like-button_active")});
        this._element.querySelector('.element__mask-group').addEventListener("click", () =>
            this._openPopupImage(this._title, this._image))
      }
      }

      

      

      
    
    
