let profileName = document.querySelector('.profile__name'); // Имя профиля
let profileBio = document.querySelector('.profile__bio'); // Биография
let elements = document.querySelector('.elements'); // Секция с элементами

let popupEditName = document.querySelector('#name');  // Инпут имя профиля
let popupEditBio = document.querySelector('#bio'); // Инпут Биография
let popupImage = document.querySelector('.popup__image'); // Картинка
let popupAddCardPlace = document.querySelector('#place');
let popupAddCardLink = document.querySelector('#link');

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


function closeEditForm() {
  var element = document.querySelector('#popup');
  element.classList.remove("popup_opened");
}

function openEditForm() {
  var element = document.querySelector('#popup');
  element.classList.add("popup_opened");
}

function closeAddCardForm() {
  var element = document.querySelector('#popup-addcard');
  element.classList.remove("popup_opened");
}

function openAddCardForm() {
  var element = document.querySelector('#popup-addcard');
  element.classList.add("popup_opened");
}

function closeImagePopup() {
  var element = document.querySelector('#popup-image');
  element.classList.remove("popup_opened");
}

// Подставляем значения в инпут
popupEditName.setAttribute('value', profileName.textContent);
popupEditBio.setAttribute('value', profileBio.textContent);


// Находим форму в DOM
const formElement = document.querySelector('#edit-profile');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profileName.textContent = popupEditName.value;
    profileBio.textContent = popupEditBio.value;
    var element = document.querySelector('#popup');
    element.classList.remove("popup_opened");

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Находим форму в DOM
const formAddCard = document.querySelector('#popup-addcard');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

function formAddCardHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    initialCards.push({ name: popupAddCardPlace.value,
      link: popupAddCardLink.value,
      isLiked: false})
    addElementBox(popupAddCardPlace.value, popupAddCardLink.value, initialCards.length-1)
    var element = document.querySelector('#popup-addcard');
    element.classList.remove("popup_opened");
    popupAddCardPlace.value = '';
    popupAddCardLink.value = '';

}
formAddCard.addEventListener('submit', formAddCardHandler);



function addElementBox(cardName, cardImageLink, id) {

  elements.insertAdjacentHTML('afterbegin', `
  <div class="elements__box" ">
    <button onclick="onClickDelete(event)" class="elements__delete" type="button" id="${id}"></button>
    <img onclick="onClickImage(event)" id="${id}-image" src="${cardImageLink}" alt="${cardName}" class="elements__image">
    <div class="elements__text">
      <h2 class="elements__title">${cardName}</h2>
      <button onclick="onClickLike(event)" id="${id}-like" class="elements__heart" type="button">
      </button>
    </div>
  </div>
`);
}

for (i in initialCards) {
  addElementBox(initialCards[i].name, initialCards[i].link, i);
}

function onClickLike(event) {
 let btn = event.target
 btn.classList.toggle("elements__heart_liked");
}
function onClickImage(event) {
  let imageSrc = event.target.src;
  popupImage.setAttribute('src', imageSrc);
  let popupSubtitle = document.querySelector('.popup__subtitle');
  popupSubtitle.textContent = event.target.alt;
  let popImage = document.querySelector('#popup-image');
  popImage.classList.add("popup_opened");
 }

 function onClickDelete(event) {
  let child = document.getElementById(event.target.id);
  child.parentElement.remove();
  delete initialCards[event.target.id];
 }
