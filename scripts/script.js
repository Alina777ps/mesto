//импорты
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { validationConfig } from "./validationConfig.js";
import { FormValidator } from "./FormValidator.js";


//попапы
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddProfile = document.querySelector(".popup-add-profile");
const popupImage = document.querySelector(".popup-image")
//формы попапов
const popupFormEdit = popupEditProfile.querySelector(".popup__form");
const popupFormAddItem = popupAddProfile.querySelector(".popup__form");
//кнопки закртия
const closePopupEdit = popupEditProfile.querySelector(".popup__close-icon");
const closePopupAdd = popupAddProfile.querySelector(".popup__close-icon");
const closePopupImage = popupImage.querySelector(".popup__close-icon")
//кнопки редактирования и добавления
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
//инпуты профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
//поля профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector('.elements');
//инпуты добавления карточек
const titleInput =  document.querySelector(".popup__input_type_title");
const pictureInput = document.querySelector(".popup__input_type_picture");

//const elementMaskGroup = document.querySelector('.element__mask-group');

const popupMaskGroup = document.querySelector('.popup__mask-group');
const popupCaption = document.querySelector('.popup__caption');

 //открытие попапа
  function openPopup(popup) {
    document.addEventListener("keydown", handleEscDown)
    popup.classList.add("popup_opened")
    
  }

 //закрытие попапа
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscDown)
  }

  //закрытие попапа esc
  function handleEscDown(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_opened")
      closePopup(popup)
  }
 }
  //
  function submitProfileForm(evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closePopup(popupEditProfile)
    popupFormAddItem.reset();
  }  
/*
  const creatCard = (elementLink, elementName) => {
    const element = template.content.querySelector('.element').cloneNode(true);
    const elementMaskGroup = element.querySelector('.element__mask-group');

    elementMaskGroup.src = elementLink;
    element.querySelector('.element__title').textContent = elementName;
    elementMaskGroup.alt = elementName;

    element.querySelector(".element__trash").addEventListener("click", () => {
      element.remove();
    })
    elementMaskGroup.addEventListener("click", () => {
      const popupMaskGroup = popupImage.querySelector(".popup__mask-group");

      popupMaskGroup.src =  elementLink;
      popupMaskGroup.alt =  elementName;
      popupImage.querySelector(".popup__caption").textContent = elementName;
      openPopup(popupImage);
    });

    element.querySelector('.element__like-button').addEventListener("click", (event) => {
      event.target.classList.toggle("element__like-button_active")});

    return element;
  }


  const renderElement = (elementLink, elementName) => {
    elements.prepend(creatCard(elementLink, elementName));
  }

  initialCards.forEach((card) => {
    renderElement(card.link, card.name);
  })
*/
  /*const addCard = (event) => {
    event.preventDefault();
    const elementLink =  pictureInput.value;
    const elementName = titleInput.value;
    renderElement(elementLink, elementName);
    popupFormAddItem.reset();
    const buttonSave = event.submitter;
    buttonSave.classList.add("popup__button_disabled");
    buttonSave.disabled = true;
    closePopup(popupAddProfile)
  }*/

//закрытие попапа по оверлею
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
  closePopup(evt.target)
  }}


  function openImage(title, image) {
    popupMaskGroup.src = image;
    popupMaskGroup.alt = title;
    popupCaption.textContent = title;
    openPopup(popupImage)
  }

function createCard(item) {
  const card = new Card(item, "#template", openImage).generateCard();
  return card;
}

function renderCard(card, elements) {
  elements.prepend(card);
}

function render() {
  initialCards.reverse().forEach((item) => {
    const newCard = createCard(item)
    if (newCard) renderCard(newCard, elements)
  })
}

render();

const addCard = (event) => {
  event.preventDefault();

  const image =  pictureInput.value;
  const title = titleInput.value;
  const newCard = createCard({ title, image })
  if (newCard) renderCard(newCard, elements)
  popupFormAddItem.reset();
  const buttonSave = event.submitter;
    buttonSave.classList.add("popup__button_disabled");
    buttonSave.disabled = true;
  closePopup(popupAddProfile)
}

//валидация
const popupEditProfileValidation = new FormValidator(validationConfig, popupEditProfile);

popupEditProfileValidation.enableValidation();

const popupAddProfileValidation = new FormValidator(validationConfig, popupAddProfile);

popupAddProfileValidation.enableValidation();



popupFormAddItem.addEventListener("submit", addCard);

closePopupImage.addEventListener("click", () => {
  closePopup(popupImage)
});

popupImage.addEventListener("click", closePopupOverlay);


profileEditButton.addEventListener("click", () => {
openPopup(popupEditProfile)
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;
});

closePopupEdit.addEventListener("click", () => {
closePopup(popupEditProfile);
});

popupEditProfile.addEventListener("click", closePopupOverlay);

profileAddButton.addEventListener("click", () => {
openPopup(popupAddProfile)
});

closePopupAdd.addEventListener("click", () => {
closePopup(popupAddProfile)
});

popupAddProfile.addEventListener("click", closePopupOverlay);


popupFormEdit.addEventListener("submit",  submitProfileForm);