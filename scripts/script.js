const formElement = document.querySelector(".popup__form");
const popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const popupAddProfile = document.querySelector(".popup__add-profile");
const closePopupEdit = popupEditProfile.querySelector(".popup__close-icon");
const closePopupAdd = popupAddProfile.querySelector(".popup__close-icon");
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAddButton = document.querySelector(".profile__add-button");


nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

function popupOpen(popup) {
  popup.classList.add("popup_opened")
}

function popupClose(popup) {
  popup.classList.remove("popup_opened")
}

function handleFormSubmit(evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    popupClose(popupEditProfile)
  }

profileEditButton.addEventListener("click", () => {
  popupOpen(popupEditProfile)
});
closePopupEdit.addEventListener("click", () => {
  popupClose(popupEditProfile)
});

profileAddButton.addEventListener("click", () => {
  popupOpen(popupAddProfile)
});

closePopupAdd.addEventListener("click", () => {
  popupClose(popupAddProfile)
});

formElement.addEventListener("submit", handleFormSubmit);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const template = document.querySelector('#template');
  const elements = document.querySelector('.elements');

  const creatInitialCards = (elementLink, elementName) => {
    const element = template.content.querySelector('.element').cloneNode(true);
    element.querySelector('.element__mask-group').src = elementLink;
    element.querySelector('.element__title').textContent = elementName;
    return element;
  }

  const renderElement = (elementLink, elementName) => {
    elements.append(creatInitialCards(elementLink, elementName));
  }

  initialCards.forEach((card) => {
    renderElement(card.link, card.name);
  })

  const titleInput =  document.querySelector(".popup__input_type_title");
  const pitureInput = document.querySelector(".popup__input_type_piture");
  const saveAddItem =  document.querySelector(".popup__save_add-item");

  const addCard = (event) => {
    event.preventDefault();
    const elementLink =  pitureInput.value;
    const elementName = titleInput.value;
    renderElement(elementLink, elementName);
    saveAddItem.reset()
    popupClose(popupAddProfile)
  }

  saveAddItem.addEventListener("submit", addCard);
