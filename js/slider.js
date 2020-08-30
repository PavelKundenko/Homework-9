function Slider({slidesContainer, nextControl, prevControl}) {
  this.slidesContainer = slidesContainer;
  this.btnNext = nextControl;
  this.btnPrev = prevControl;
  this.isSwitching = false;
  this.activeItem = 0;
  this.managingWithButtons();

  const slides = [...slidesContainer.children];
  this.slideWidth = slides[0].clientWidth;
  this.slidesOffset = -this.slideWidth;

  slides.forEach((slide) => {
    slide.style.transform = `translateX(${this.slidesOffset}px)`;
  });

  this.slidesContainer.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);
  this.slidesContainer.removeChild(slides[slides.length - 1]);
}

Slider.prototype.managingWithButtons = function() {
  this.btnNext.addEventListener('click', () => this.infiniteSwitchSlide(-1));
  this.btnPrev.addEventListener('click', () => this.infiniteSwitchSlide(1));
};

Slider.prototype.infiniteSwitchSlide = function(direction) {
  if (!this.isSwitching) {
    const slides = [...this.slidesContainer.children];
    this.isSwitching = true;

    const animationMove = setInterval(() => {
      this.slidesOffset += 5 * direction;

      slides.forEach((slide) => {
        slide.style.transform = `translateX(${this.slidesOffset}px)`;
      });

      if (Math.abs(this.slidesOffset) >= slides[0].clientWidth * 2 ||
          Math.abs(this.slidesOffset) === 0) {
        clearInterval(animationMove);
        this.slidesOffset = -this.slideWidth;

        slides.forEach((slide) => {
          slide.style.transform = `translateX(${this.slidesOffset}px)`;
        });

        if (direction === -1) {
          slides[slides.length - 1].after(slides[0].cloneNode(true));
          this.slidesContainer.removeChild(slides[0]);
        } else {
          this.slidesContainer.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);
          this.slidesContainer.removeChild(slides[slides.length - 1]);
        }
        this.isSwitching = false;
      }
    }, 5);
  }
};

const slider1Config = {
  slidesContainer: document.querySelector('.portfolio__slider'),
  nextControl: document.querySelector('.portfolio-controllers__arrow--next'),
  prevControl: document.querySelector('.portfolio-controllers__arrow--prev'),
};

const movingSlider = new Slider(slider1Config);
movingSlider.slideShow = function() {
  this.slideShowInterval = setInterval(() => this.infiniteSwitchSlide(-1), 5000);
  this.slidesContainer.addEventListener('mouseover', () => {
    clearInterval(this.slideShowInterval);
    this.slidesContainer.addEventListener('mouseout', () => {
      this.slideShowInterval = setInterval(() => this.infiniteSwitchSlide(-1), 5000);
    }, {once: true});
  });
};
movingSlider.slideShow();

movingSlider.managingWithSwipe = function() {
  // universal handler for swiping by mouse and touch
  this.onSwipe = function(startEvent) {
    startEvent.preventDefault();
    const upEventType = startEvent.type === 'mousedown' ? 'mouseup' : 'touchend';
    this.slidesContainer.addEventListener(upEventType, (upEvent) => {
      const startX = startEvent.type === 'mousedown' ?
        startEvent.clientX :
        startEvent.touches[0].clientX;

      const endX = startEvent.type === 'mousedown' ?
        upEvent.clientX :
        upEvent.changedTouches[0].clientX;

      if (startX - endX > 100) {
        this.infiniteSwitchSlide(-1);
      } else if (startX - endX < -100) {
        this.infiniteSwitchSlide(1);
      }
    }, {once: true});
  };
  this.slidesContainer.addEventListener('touchstart', this.onSwipe.bind(this));
  this.slidesContainer.addEventListener('mousedown', this.onSwipe.bind(this));
};

movingSlider.managingWithSwipe();

const slider2Config = {
  slidesContainer: document.querySelector('.testimonials__slider'),
  nextControl: document.querySelector('.testimonials__arrow--right'),
  prevControl: document.querySelector('.testimonials__arrow--left'),
};

const fadingSlider = new Slider(slider2Config);
fadingSlider.fadingSwipe = function(direction) {
  if (!this.isSwitching) {
    this.isSwitching = true;
    this.slidesContainer.style.transition = 'opacity .2s ease';
    const slides = [...this.slidesContainer.children];

    this.slidesMarkers[this.activeItem].classList.remove('slider-counter__circle--chosen');
    this.activeItem -= direction;

    if (this.activeItem > slides.length - 1) {
      this.activeItem = 0;
    } else if (this.activeItem < 0) {
      this.activeItem = slides.length - 1;
    }

    this.slidesMarkers[this.activeItem].classList.add('slider-counter__circle--chosen');

    this.slidesContainer.style.opacity = '0';
    setTimeout(() => {
      if (direction === -1) {
        slides[slides.length - 1].after(slides[0].cloneNode(true));
        this.slidesContainer.removeChild(slides[0]);
      } else {
        this.slidesContainer.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);
        this.slidesContainer.removeChild(slides[slides.length - 1]);
      }
      this.slidesContainer.style.opacity = '1';
    }, 200);

    this.isSwitching = false;
  }
};

fadingSlider.infiniteSwitchSlide = fadingSlider.fadingSwipe;

fadingSlider.initCounter = function() {
  const slidesCount = [...this.slidesContainer.children].length;
  const counterHtml = `
    <div class="slider-counter">
      ${'<div class="slider-counter__circle"></div>'.repeat(slidesCount)}
    </div>
  `;
  this.slidesContainer.insertAdjacentHTML('afterend', counterHtml);
  this.slidesMarkers = this.slidesContainer.parentNode.querySelectorAll('.slider-counter__circle');
  this.slidesMarkers[0].classList.add('slider-counter__circle--chosen');
};

fadingSlider.initCounter();
