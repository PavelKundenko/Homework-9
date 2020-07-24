function Slider ({ slidesContainer, nextControl, prevControl, slideShow = true, moving = true, slideShowDelay = 3000 }) {
  this.slidesContainer = slidesContainer;
  this.btnNext = nextControl;
  this.btnPrev = prevControl;
  this.slideShowDelay = slideShowDelay;
  this.slidesOffset = 0;
  this.isSwitching = false;
  this.activeItem = 0;
  this.managingWithButtons();
}

Slider.prototype.managingWithButtons = function () {
  this.btnNext.addEventListener('click', () => this.infiniteSwitchSlide(-1));
  this.btnPrev.addEventListener('click', () => this.infiniteSwitchSlide(1));
};

Slider.prototype.infiniteSwitchSlide = function (direction) {
  if (!this.isSwitching) {
    const slides = [...this.slidesContainer.children];
    this.isSwitching = true;

    const animationMove = setInterval(() => {
      this.slidesOffset += 5 * direction;

      slides.forEach(slide => {
        slide.style.transform = `translateX(${this.slidesOffset}px)`;
      });

      if (Math.abs(this.slidesOffset) >= slides[0].clientWidth) {
        clearInterval(animationMove);
        this.slidesOffset = 0;

        slides.forEach(slide => {
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
  slideShowDelay: 5000
};

const movingSlider = new Slider(slider1Config);
movingSlider.slideShow = function () {
  this.slideShowInterval = setInterval(() => this.infiniteSwitchSlide(-1), this.slideShowDelay);
  this.slidesContainer.addEventListener('mouseover', () => {
    clearInterval(this.slideShowInterval);
    this.slidesContainer.addEventListener('mouseout', () => {
      this.slideShowInterval = setInterval(() => this.infiniteSwitchSlide(-1), this.slideShowDelay);
    }, { once: true });
  });
};
movingSlider.slideShow();

movingSlider.managingWithSwipe = function () {
  // universal handler for swiping by mouse and touch
  this.onSwipe = function (startEvent) {
    startEvent.preventDefault();
    const upEventType = startEvent.type === 'mousedown' ? 'mouseup' : 'touchend';
    this.slidesContainer.addEventListener(upEventType, upEvent => {
      const startX = startEvent.type === 'mousedown' ? startEvent.clientX : startEvent.touches[0].clientX;
      const endX = startEvent.type === 'mousedown' ? upEvent.clientX : upEvent.changedTouches[0].clientX;

      if (startX - endX > 100) {
        this.infiniteSwitchSlide(-1);
      } else if (startX - endX < -100) {
        this.infiniteSwitchSlide(1);
      }
    }, { once: true });
  };
  this.slidesContainer.addEventListener('touchstart', this.onSwipe.bind(this));
  this.slidesContainer.addEventListener('mousedown', this.onSwipe.bind(this));
};

movingSlider.managingWithSwipe();

const slider2Config = {
  slidesContainer: document.querySelector('.testimonials__slider'),
  nextControl: document.querySelector('.testimonials__arrow--right'),
  prevControl: document.querySelector('.testimonials__arrow--left')
};

const fadingSlider = new Slider(slider2Config);
fadingSlider.fadingSwipe = function (direction) {
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
    console.log(this.activeItem);

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

fadingSlider.initCounter = function () {
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
