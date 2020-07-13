import Slider from './helpers/slider.js';

const slider1Config = {
  slidesContainer: document.querySelector('.portfolio__slider'),
  nextControl: document.querySelector('.portfolio-controllers__arrow--next'),
  prevControl: document.querySelector('.portfolio-controllers__arrow--prev'),
  slideShowDelay: 5000
};

const slider1 = new Slider(slider1Config);

const slider2Config = {
  slidesContainer: document.querySelector('.testimonials__slider'),
  nextControl: document.querySelector('.testimonials__arrow--right'),
  prevControl: document.querySelector('.testimonials__arrow--left'),
  slideShow: false,
  moving: false
};

const slider2 = new Slider(slider2Config);

console.log(slider1, slider2); // line for avoiding eslint error 'non unused variables'
