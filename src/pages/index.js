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
const popups = document.querySelectorAll(".popup");
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
//инпуты добавления карточек
const titleInput = document.querySelector(".popup__input_type_title");
const pictureInput = document.querySelector(".popup__input_type_image");

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




/*
//конфиг форм
const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    //объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
*/


/*
//открытие попапа
function openPopup(popup) {
  document.addEventListener("keydown", handleEscDown);
  popup.classList.add("popup_opened");
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscDown);
}

//закрытие попапа esc
function handleEscDown(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//закрытие попапов по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }
  });
});

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
  popupFormEdit.reset();
}

function openImage(title, image) {
  popupMaskGroup.src = image;
  popupMaskGroup.alt = title;
  popupCaption.textContent = title;
  openPopup(popupImage);
}



function renderCard(card, elements) {
  elements.prepend(card);
}

function render() {
  initialCards.reverse().forEach((item) => {
    const newCard = createCard(item);
    if (newCard) renderCard(newCard, elements);
  });
}

render();

const addCard = (event) => {
  event.preventDefault();

  const image = pictureInput.value;
  const title = titleInput.value;
  const newCard = createCard({ title, image });
  if (newCard) renderCard(newCard, elements);
  popupFormAddItem.reset();
  formValidators["popupFormAddItem"].resetValidation();
  closePopup(popupAddProfile);
};

popupFormAddItem.addEventListener("submit", addCard);

profileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  formValidators['popupFormEdit'].resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAddProfile);
});

popupFormEdit.addEventListener("submit", submitProfileForm);
*/