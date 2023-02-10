export class Card {
    constructor(data, templateElement, handleCardClick) {
        this._title = data.title;
        this._image = data.image;
        this._templateElement = templateElement;
        this._handleCardClick = handleCardClick
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

        this._cardImage = this._element.querySelector('.element__mask-group');
        
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;

        this._setEventListeners();
    
        return this._element;
      }
      
      _setEventListeners() {
        this._element.querySelector(".element__trash").addEventListener("click", () => {
            this._element = null;
        });
        this._element.querySelector('.element__like-button').addEventListener("click", (event) => {
            event.target.classList.toggle("element__like-button_active")});
        this._cardImage.addEventListener("click", () =>
            this._handleCardClick(this._title, this._image))
      }
      }

      

      

      
    
    
