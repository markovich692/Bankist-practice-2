'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelector('.nav__links');
const section1 = document.querySelector('#section--1');

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

  console.log(scrollToSection);
  console.log(document.querySelector(scrollToSection));

  document
    .querySelector(scrollToSection)
    .scrollIntoView({ behavior: 'smooth' });
});

//Learn more

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault;

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
