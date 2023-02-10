//импорты
import "./index.css";

import { Card } from "../copmonents/Card.js";
import { initialCards } from "../utils/initialCards.js";
import { validationConfig } from "../copmonents/validationConfig.js";
import { FormValidator } from "../copmonents/FormValidator.js";
import Section from "../copmonents/Section.js";
import PopupWithImage from "../copmonents/PopupWithImage.js"
import PopupWithForm from "../copmonents/PopupWithForm.js";
import UserInfo from "../copmonents/UserInfo.js";

//попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddProfile = document.querySelector(".popup-add-profile");
const popupImage = document.querySelector(".popup-image");
//формы попапов
const popupFormEdit = document.forms.popupFormEdit;
const popupFormAddItem = document.forms.popupFormAddItem;
//кнопки редактирования и добавления
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
//инпуты профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
//поля профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector(".elements");

const popupMaskGroup = document.querySelector(".popup__mask-group");
const popupCaption = document.querySelector(".popup__caption");

//валидация
const validationPopupEdit = new FormValidator(validationConfig, popupFormEdit);
validationPopupEdit.enableValidation();

const validationPopupAdd = new FormValidator(validationConfig, popupFormAddItem);
validationPopupAdd.enableValidation();


//открытие и закрытие попапа с картинкой
const newPopupImage = new PopupWithImage(popupImage);

function openImage() {
  newPopupImage.open(popupMaskGroup, popupCaption);
}

newPopupImage.setEventListeners();

 
function createCard(item) {
  const card = new Card(item, "#template", openImage).generateCard();
  return card;
}

//отрисовка карточек на странице из массива
const cardList = new Section({ items: initialCards, renderer: (item) => {
  cardList.addItem(createCard(item))
  } }, elements);
  cardList.renderItems();

//попап добавления
const newPopupAdd = new PopupWithForm(popupAddProfile, (item) => {
  cardList.addItem(createCard(item))
});

function openPopupAdd() {
  validationPopupAdd.resetValidation();
  newPopupAdd.open();
}

addButton.addEventListener("click", openPopupAdd);

newPopupAdd.setEventListeners();


//попап редактирования
const editUserInfo = new UserInfo({ name: profileTitle, job: profileSubtitle });

function formValues(value) {
  editUserInfo.setUserInfo(value.name, value.job);
  newPopupEdit.close();
}

const newPopupEdit = new PopupWithForm(popupEditProfile, formValues);

function openPopupEdit() {
  validationPopupEdit.resetValidation();
  //editUserInfo.getUserInfo(nameInput, jobInput);
  const { name, job } = editUserInfo.getUserInfo()
  nameInput.value = name
  jobInput.value = job
  newPopupEdit.open();
}

editButton.addEventListener("click", openPopupEdit);

newPopupEdit.setEventListeners();