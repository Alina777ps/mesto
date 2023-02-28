export class Card {
  constructor(
    data,
    templateElement,
    handleCardClick,
    userId,
    like,
    dislike,
    deleteCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
  }

  like() {
    this._likeButton.classList.add("element__like-button_active");
  }

  dislike() {
    this._likeButton.classList.remove("element__like-button_active");
  }

  _userLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  likesCount(res) {
    this._likesNumber.textContent = `${res.likes.length}`;
  }

  remove() {
    this._cardElement.remove();
  }

  generateCard = () => {
    const template = document.querySelector(this._templateElement);
    if (template) {
      const element = template.content.querySelector(".element");
      if (element) {
        this._cardElement = element.cloneNode(true);
      } else console.log("В классе Card не найден .element!");
    } else console.log("Произошла ошибка. Не найден " + this._templateElement);

    this._likeButton = this._cardElement.querySelector(".element__like-button");

    // Устанавливаю счетчик для подсчета лайков
    this._likesNumber = this._cardElement.querySelector(
      ".element__like-number"
    );
    this._likesNumber.textContent = this._likes.length;
    this._buttonTrash = this._cardElement.querySelector(".element__trash");
    if (this._ownerId !== this._userId) {
      this._buttonTrash.remove();
    }

    this._cardImage = this._cardElement.querySelector(".element__mask-group");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    this._setEventListeners();
    this._userLiked();

    return this._cardElement;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like-button_active")) {
        this._dislike();
      } else {
        this._like();
      }
<<<<<<< HEAD
      
      _setEventListeners() {
        this._element.querySelector(".element__trash").addEventListener("click", () => {
            this._element.remove();
        });
        this._element.querySelector('.element__like-button').addEventListener("click", (event) => {
            event.target.classList.toggle("element__like-button_active")});
        this._cardImage.addEventListener("click", () =>
            this._handleCardClick(this._title, this._image))
      }
      }

      

      

      
    
    
=======
    });
    this._buttonTrash.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
>>>>>>> develop
