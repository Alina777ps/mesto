let formElement = document.querySelector(".popup__form");
let popup = document.querySelector(".popup");
let popupCloseIcon = document.querySelector(".popup__close-icon");
let profileEditButton = document.querySelector(".profile__edit-button");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_job");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

function popupOpen() {
    popup.classList.add("popup_opened")
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function popupClose() {
    popup.classList.remove("popup_opened")
}

function handleFormSubmit(evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    popupClose()
  }

profileEditButton.addEventListener("click", popupOpen);
popupCloseIcon.addEventListener("click", popupClose);
formElement.addEventListener("submit", handleFormSubmit);