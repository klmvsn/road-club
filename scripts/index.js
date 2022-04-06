let slideIndex = 1;
const toggles = document.querySelectorAll('.theme-switcher__checkbox');
const form = document.querySelector('.footer__form');
const email = document.querySelector('.footer__email');
const submitButton = document.querySelector('.footer__email-submit');
const prevButtons = document.querySelectorAll('.slider__button_type_previous');
const nextButtons = document.querySelectorAll('.slider__button_type_next');
let slides = document.querySelectorAll('.slider__item');
const hiddenPhotos = document.querySelectorAll('.slider__illustration_mobile_hidden');
const bikesLinks = document.querySelectorAll('.bikes__option-item');
let activeBikeLink = document.querySelector('.bikes__option-item_type_active');
const bikesGallery = document.querySelectorAll('.bikes__gallery');
let bikesMap = new Map();
const select = document.querySelector('.bikes__options-mobile');
const selectTitle = document.querySelector('.bikes__select-title');
const selectLabels = document.querySelectorAll('.bikes__select-label');
const sliderDots = document.querySelectorAll('.bikes__slider-dot');
const menuItems = document.querySelectorAll('.menu__item');
const hamburgerButton = document.querySelector('.header__hamburger-button');


/*Изменение темы по клику на переключатель*/
toggles.forEach(item => item.addEventListener('click', () => {
  let currentTheme = document.documentElement.getAttribute('data-theme');
  let targetTheme = 'light';

  if (currentTheme === 'light') {
    targetTheme = 'dark'
  }
  document.documentElement.setAttribute('data-theme', targetTheme);
}))

/*Изменения при фокусе на форму*/

function hideButton() {
  submitButton.style.display = 'none';
}

email.addEventListener('focus', () => {
  email.setAttribute('placeholder', '');
  submitButton.style.display = 'block';
})

email.addEventListener('blur', () => {
  email.setAttribute('placeholder', 'Ваш e-mail');
  if (emailForm.value === '') {
    hideButton();
  }
})

/*Обработка формы по нажатию кнопки*/
form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (email.value !== '') {
    email.value = 'Круто!';
    email.setAttribute('disabled', 'true');
  }
  hideButton();
})

/*Слайдер*/
function nextSlide() {
  showSlides(slideIndex += 1);
}

function previousSlide() {
  showSlides(slideIndex -= 1);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'grid';
  if (window.innerWidth < 798) {
    hiddenPhotos.forEach(item => item.style.display = 'none');
  }
}

showSlides();
prevButtons.forEach(item => item.addEventListener('click', previousSlide));
nextButtons.forEach(item => item.addEventListener('click', nextSlide));

/*Переключатель с велосипедами*/
for (let i = 0; i < bikesGallery.length; i++) {
  bikesMap.set(bikesLinks[i], bikesGallery[i]);
}

function showGallery(activeLink) {
  bikesGallery.forEach(item => item.style.display = 'none');
  bikesMap.get(activeLink).style.display = 'flex';
}

function makeNewActiveLink(newLink) {
  if (newLink !== activeBikeLink) {
    newLink.classList.add('bikes__option-item_type_active');
    activeBikeLink.classList.remove('bikes__option-item_type_active');
    activeBikeLink = newLink;
  }
}

showGallery(activeBikeLink);

bikesLinks.forEach(link => link.addEventListener('click', evt => {
  makeNewActiveLink(evt.target);
  showGallery(activeBikeLink);
}));

/*Поле множественного выбора для мобильного разрешения*/
selectTitle.addEventListener('click', () => {
  if ('active' === select.getAttribute('data-state')) {
    select.setAttribute('data-state', '');
  } else {
    select.setAttribute('data-state', 'active');
}})

for(let i=0; i<selectLabels.length; i++) {
  selectLabels[i].addEventListener('click', evt => {
    console.log(evt.target.textContent);
    selectTitle.textContent = evt.target.textContent;
    bikesGallery.forEach(item => item.style.display = 'none');
    bikesGallery[i].style.display = 'flex';
    sliderDots.forEach(item => item.classList.remove('bikes__slider-dot_type_active'));
    sliderDots[i].classList.add('bikes__slider-dot_type_active');
    select.setAttribute('data-state', '');
  })
}

/*Закрытие бругерного меню после нажатия на кнопку меню*/
hamburgerButton.addEventListener('click', () => {
  hamburgerButton.classList.toggle('header__hamburger-button_status_active');
})

/*Закрытие бругерного меню после нажатия на ссылку*/
menuItems.forEach(item => item.addEventListener('click', () => {
  hamburgerButton.classList.remove('header__hamburger-button_status_active');
}))

