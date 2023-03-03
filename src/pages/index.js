//импорты
import "./index.css";
import { Card } from "../copmonents/Card.js";
import { validationConfig } from "../copmonents/validationConfig.js";
import { FormValidator } from "../copmonents/FormValidator.js";
import Section from "../copmonents/Section.js";
import PopupWithImage from "../copmonents/PopupWithImage.js";
import PopupWithForm from "../copmonents/PopupWithForm.js";
import UserInfo from "../copmonents/UserInfo.js";
import Api from "../copmonents/Api.js";
import PopupConfirmation from "../copmonents/PopupConfirmation.js";

//попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddProfile = document.querySelector(".popup-add-profile");
const popupImage = document.querySelector(".popup-image");
const popupAvatar = document.querySelector(".popup-avatar-edit");
const popupConfirmationDelete = document.querySelector(".popup-confirmation");
//формы попапов
const popupFormEdit = document.forms.popupFormEdit;
const popupFormAddItem = document.forms.popupFormAddItem;
const popupFormUpdateAvatar = document.forms.popupAvatarEdit;
//кнопки редактирования и добавления
const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popupProfileAddButton = document.querySelector(".profile__add-button");
const popupProfileAvatarButton = document.querySelector(".profile__avatar-edit");
//инпуты профиля
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
//поля профиля
const nameProfile = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
const avatarProfile = document.querySelector(".profile__avatar");

const elements = document.querySelector(".elements");

let userId;

//создание экземпляров класса PopupWithForm
const newPopupImage = new PopupWithImage(popupImage);

const newPopupAdd = new PopupWithForm(popupAddProfile, submitFormAddCard);

const newPopupEdit = new PopupWithForm(popupEditProfile, submitFormEditProfile);

const newPopupAvatar = new PopupWithForm(popupAvatar, submitFormUpdateAvatar);

const user = new UserInfo({
  name: nameProfile,
  about: aboutProfile,
  avatar: avatarProfile,
});

//Открытие попапа картинки
function openImage(name, link) {
  newPopupImage.open(name, link);
  //newPopupImage.setEventListeners() 
}

//создание карточек
function createCard(data) {
  const card = new Card(
    data,
    "#template",
    openImage,
    userId,
    async () => {
      try {
        const res = await api.addLike(data._id);
        card.like();
        card.likesCount(res);
      } catch (error) {
        return console.log(`Произошла ошибка: ${error}`);
      }
    },
    async () => {
      try {
        const res = await api.removeLike(data._id);
        card.dislike();
        card.likesCount(res);
      } catch (error) {
        return console.log(`Произошла ошибка: ${error}`);
      }
    },
    () => {
      newpopupConfirmation.open(card);
      //newpopupConfirmation.setEventListeners();
    }
  );

  return card.generateCard();
}

//добавление карточек
async function submitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data);
    cardList.addItem(createCard(newCard));
  } catch (error) {
    return console.log(`Произошла ошибка: ${error}`);
  }
}

//редактирование профиля
async function submitFormEditProfile(data) {
  try {
    const userProfile = await api.editProfile(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    return console.log(`Произошла ошибка: ${error}`);
  }
}

//изменение аватара
async function submitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateAvatar(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    return console.log(`Произошла ошибка: ${error}`);
  }
}

popupProfileEditButton.addEventListener(
  "click",
  () => {
    newPopupEdit.open();
    //newPopupEdit.setEventListeners(user.getUserInfo());
    validationPopupEdit.resetValidation();
    const { name, about } = user.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
  },
  false
);

popupProfileAvatarButton.addEventListener(
  "click",
  () => {
    newPopupAvatar.open();
    validatorUpdateAvatar.resetValidation();
    //newPopupAvatar.setEventListeners();
  },
  false
);

popupProfileAddButton.addEventListener(
  "click",
  () => {
    newPopupAdd.open();
    //newPopupAdd.setEventListeners();
    validationPopupAdd.resetValidation();
  },
  false
);

//валидация
const validationPopupEdit = new FormValidator(validationConfig, popupFormEdit);
validationPopupEdit.enableValidation();

const validationPopupAdd = new FormValidator(
  validationConfig,
  popupFormAddItem
);
validationPopupAdd.enableValidation();

const validatorUpdateAvatar = new FormValidator(
  validationConfig,
  popupFormUpdateAvatar
);
validatorUpdateAvatar.enableValidation();

//создание попапа подтверждение удаления
const newpopupConfirmation = new PopupConfirmation(
  popupConfirmationDelete,
  async (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.remove();
        newpopupConfirmation.close();
      })
      .catch((error) => console.log(`Произошла ошибка: ${error}`));
  }
);

// Загружка карточек с сервера
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);

      cardList.addItem(card);
    },
  },
  elements
);

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "e0bed1d8-4343-452c-a8c4-4d68365fbfac",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

//отрисовка карточек и данных пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile);
    userId = userProfile._id;
    cardList.renderItems(cards);
  })

  .catch((error) => console.log(`Произошла ошибка: ${error}`));
