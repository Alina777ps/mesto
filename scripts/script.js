const formElement = document.querySelector(".popup__form");
const popup = document.querySelector(".popup");
const popupCloseIcon = document.querySelector(".popup__close-icon");
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

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