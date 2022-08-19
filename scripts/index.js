const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileBio = document.querySelector('.profile__bio'); // Биография
const element = document.querySelector('.elements'); // Секция с элементами

const popupEditName = document.querySelector('#name');  // Инпут имя профиля
const popupEditBio = document.querySelector('#bio'); // Инпут Биография
const popupImage = document.querySelector('.popup__image'); // Картинка
const popupAddCardPlace = document.querySelector('#place');
const popupAddCardLink = document.querySelector('#link');
const popImage = document.querySelector('#popup-image'); // Окно Попапа Картинки
const popupSubtitle = document.querySelector('.popup__subtitle');


const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const cardAddBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddCard = document.querySelector('#popup-addcard');

const cardsTemplate = document.querySelector('#element').content;
const elementBox = document.querySelector('.elements');


profileEditBtn.addEventListener('click', openEditForm);
cardAddBtn.addEventListener('click', openAddCardForm);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    isLiked: false
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    isLiked: false
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    isLiked: false
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    isLiked: false
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    isLiked: false
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    isLiked: false
  }
];




function openEditForm() {
  popupEditName.setAttribute('value', profileName.textContent);
  popupEditBio.setAttribute('value', profileBio.textContent);
  openPopup(popupEditProfile);
}
function openAddCardForm() {
  openPopup(popupAddCard);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('click', closePopupClickingOverlay);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupClickingOverlay);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    let popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}
function closePopupClickingOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
popupCloseBtns.forEach((p) => {
  p.addEventListener('click', (event) => {
    closePopup(event.target.parentElement.parentElement);
  })
});

function onClickImage(event) {
  const imageSrc = event.target.src;
  popupImage.setAttribute('src', imageSrc);
  popupImage.setAttribute('alt', event.target.alt);
  popupSubtitle.textContent = event.target.alt;
  openPopup(popImage);
 }


// Находим форму в DOM
const formEditProfile = document.querySelector('#edit-profile');// Воспользуйтесь методом querySelector()
function saveProfileHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = popupEditName.value;
    profileBio.textContent = popupEditBio.value;
    closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', saveProfileHandler);

// Находим форму в DOM
const formAddCard = document.querySelector('#add-place');// Воспользуйтесь методом querySelector()
function addCardHandler (evt) {
    evt.preventDefault();
    addCardToContainer(addElementBox(popupAddCardPlace.value, popupAddCardLink.value));
    closePopup(popupAddCard);
    popupAddCardPlace.value = '';
    popupAddCardLink.value = '';
}
formAddCard.addEventListener('submit', addCardHandler);



function addElementBox(cardName, cardImageLink) {
  const newElement = cardsTemplate.querySelector('.elements__box').cloneNode(true);
  const elementImage = newElement.querySelector('.elements__image');
  const elementTitle = newElement.querySelector('.elements__title');
  elementImage.src = cardImageLink;
  elementImage.alt = cardName;
  elementTitle.textContent = cardName;
  return newElement;
}

function addCardToContainer(element) {
  elementBox.prepend(element);
}

element.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__heart')) {
    evt.target.classList.toggle("elements__heart_liked");
  }
  if (evt.target.classList.contains('elements__delete')) {
    evt.target.parentElement.remove()
  }
  if (evt.target.classList.contains('elements__image')) {
    onClickImage(evt);
  }
});


for (i in initialCards) {
  addCardToContainer(addElementBox(initialCards[i].name, initialCards[i].link, i));
}



