const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileBio = document.querySelector('.profile__bio'); // Биография
const element = document.querySelector('.elements'); // Секция с элементами

const popupEditName = document.querySelector('#name');  // Инпут имя профиля
const popupEditBio = document.querySelector('#bio'); // Инпут Биография
const popupImage = document.querySelector('.popup__image'); // Картинка
const popupAddCardPlace = document.querySelector('#place');
const popupAddCardLink = document.querySelector('#link');
const popupSubtitle = document.querySelector('.popup__subtitle');
const popImage = document.querySelector('#popup-image'); // Окно Попапа


const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const cardAddBtn = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const popup = document.querySelector('#popup');
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
  const element = document.querySelector('#popup');
  popupEditName.setAttribute('value', profileName.textContent);
  popupEditBio.setAttribute('value', profileBio.textContent);
  element.classList.add("popup_opened");
}
function openAddCardForm() {
  const element = document.querySelector('#popup-addcard');
  element.classList.add("popup_opened");
}

const popupCloseBtn = document.querySelectorAll('.popup__close-btn');

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

popupCloseBtn.forEach((c) => {
  c.addEventListener('click', (event) => {
    closePopup(event.target.parentElement.parentElement);
  })
});

// Находим форму в DOM
const formEditProfile = document.querySelector('#edit-profile');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function saveProfileHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profileName.textContent = popupEditName.value;
    profileBio.textContent = popupEditBio.value;
    popup.classList.remove("popup_opened");

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', saveProfileHandler);

// Находим форму в DOM
const formAddCard = document.querySelector('#popup-addcard');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

function addCardHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    addElementBox(popupAddCardPlace.value, popupAddCardLink.value, initialCards.length-1);
    popupAddCard.classList.remove("popup_opened");
    popupAddCardPlace.value = '';
    popupAddCardLink.value = '';
}
formAddCard.addEventListener('submit', addCardHandler);



function addElementBox(cardName, cardImageLink, id) {
  let newElement = cardsTemplate.querySelector('.elements__box').cloneNode(true);
  newElement.querySelector('.elements__image').src = cardImageLink;
  newElement.querySelector('.elements__image').id = id + '-image';
  newElement.querySelector('.elements__image').alt = cardName;
  newElement.querySelector('.elements__title').textContent = cardName;
  newElement.querySelector('.elements__heart').id = id + '-like';
  newElement.querySelector('.elements__delete').id = id;
  elementBox.prepend(newElement);
  newElement.querySelector('.elements__delete').addEventListener('click', () => {
    newElement.remove();
  });
  newElement.querySelector('.elements__heart').addEventListener('click', () => {
    newElement.querySelector('.elements__heart').classList.toggle("elements__heart_liked");
  });
  newElement.querySelector('.elements__image').addEventListener('click', (event) => {
         onClickImage(event);
  });

}

for (i in initialCards) {
  addElementBox(initialCards[i].name, initialCards[i].link, i);
}


function onClickImage(event) {
  const imageSrc = event.target.src;
  popupImage.setAttribute('src', imageSrc);
  popupImage.setAttribute('alt', event.target.alt);
  popupSubtitle.textContent = event.target.alt;
  popImage.classList.add("popup_opened");
 }


// let likeBtn = document.querySelectorAll('.elements__heart');
// let deleteBtn = document.querySelectorAll('.elements__delete');
// let imageCard = document.querySelectorAll('.elements__image');

// likeBtn.forEach((l) => {
//   l.addEventListener('click', () => {
//     l.classList.toggle("elements__heart_liked");
//     console.log('d');
//   });
// });

// deleteBtn.forEach((d) => {
//   d.addEventListener('click', () => {
//     d.parentElement.remove();
//   });
// });

// imageCard.forEach((i) => {
//   i.addEventListener('click', (event) => {
//     onClickImage(event);
//   });
// });







