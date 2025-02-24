'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const featuresImg = document.querySelectorAll('.features__img');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Implements smooth scrolling
//Nav links
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  //Guard Clause
  if (!e.target.classList.contains('nav__link')) return;

  const scrollToSection = e.target.getAttribute('href');

  document
    .querySelector(scrollToSection)
    .scrollIntoView({ behavior: 'smooth' });
});

//Learn more button
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault;

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//Sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const headerCallbackObs = function (entries, observer) {
  entries.forEach(function (entry) {
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};

const headerObserver = new IntersectionObserver(headerCallbackObs, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//LAZY IMAGE

const displayImg = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const sourceData = entry.target.dataset.src;
      entry.target.src = sourceData;

      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });
    }
  });
};

const imgObserver = new IntersectionObserver(displayImg, {
  root: null,
  threshold: 0,
});

featuresImg.forEach(img => imgObserver.observe(img));

//TAB
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');

operationsTabs.forEach(function (tab) {
  tab.addEventListener('click', function (e) {
    const dataTab = e.target.closest('.operations__tab').dataset.tab;

    operationsTabs.forEach(function (tab) {
      tab.classList.remove('operations__tab--active');
    });

    e.target
      .closest('.operations__tab')
      .classList.add('operations__tab--active');

    operationsContent.forEach(function (content) {
      content.classList.remove('operations__content--active');
      if (content.classList.contains(`operations__content--${dataTab}`)) {
        content.classList.add('operations__content--active');
      }
    });
  });
});

//SLIDER

const slides = document.querySelectorAll('.slide');

let transform = 0;

slides.forEach(function (slide, index) {
  slide.style.scale = 0.15;

  slide.style.transform = `translateX(${transform}%)`;

  transform += 100;
});
