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

const template = document.querySelector('#template');
const elements = document.querySelector('.elements');
//инпуты добавления карточек
const titleInput =  document.querySelector(".popup__input_type_title");
const pictureInput = document.querySelector(".popup__input_type_picture");


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

  function popupOpen(popup) {
    popup.classList.add("popup_opened")
  }
  
  function popupClose(popup) {
    popup.classList.remove("popup_opened")
  }
  
  function submitProfileForm(evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    popupClose(popupEditProfile)
  }  


  const creatCard = (elementLink, elementName) => {
    const element = template.content.querySelector('.element').cloneNode(true);
    element.querySelector('.element__mask-group').src = elementLink;
    element.querySelector('.element__title').textContent = elementName;
    element.querySelector('.element__mask-group').alt = elementName;
    element.querySelector(".element__trash").addEventListener("click", () => {
      element.remove();
    })
    element.querySelector('.element__mask-group').addEventListener("click", () => {
      popupImage.querySelector(".popup__mask-group").src =  elementLink;
      popupImage.querySelector(".popup__mask-group").alt =  elementName;
      popupImage.querySelector(".popup__caption").textContent = elementName;
      popupOpen(popupImage);
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

  const addCard = (event) => {
    event.preventDefault();
    const elementLink =  pictureInput.value;
    const elementName = titleInput.value;
    renderElement(elementLink, elementName);
    popupFormAddItem.reset()
    popupClose(popupAddProfile)
  }

  popupFormAddItem.addEventListener("submit", addCard);
  
  closePopupImage.addEventListener("click", () => {
    popupClose(popupImage)
  });

profileEditButton.addEventListener("click", () => {
  popupOpen(popupEditProfile)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
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

popupFormEdit.addEventListener("submit",  submitProfileForm);



