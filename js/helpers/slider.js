export default class Slider {
  constructor ({ slidesContainer, nextControl, prevControl, slideShow = true, moving = true, slideShowDelay = 3000 }) {
    this.slidesContainer = slidesContainer;
    this.btnNext = nextControl;
    this.btnPrev = prevControl;
    this.slideShowDelay = slideShowDelay;
    this.slidesOffset = Number(this.slidesContainer.style.left);

    this.switchSlide = moving ? this.movingSwitchSlide : this.fadingSwitchSlide;

    this.btnNext.addEventListener('click', () => this.switchSlide(-1));
    this.btnPrev.addEventListener('click', () => this.switchSlide(1));

    if (slideShow) {
      this.slideShow();
      this.slidesContainer.addEventListener('mouseover', this.onMouseOver);
    }

    this.slidesContainer.addEventListener('touchstart', this.onTouch);
  }

  isSwitching = false;

  onTouch = startEvent => {
    this.slidesContainer.addEventListener('touchend', endEvent => {
      const startX = startEvent.touches[0].clientX;
      const endX = endEvent.changedTouches[0].clientX;

      if (startX - endX > 100) {
        this.switchSlide(-1);
      } else if (startX - endX < -100) {
        this.switchSlide(1);
      }
    }, { once: true });
  };

  onMouseOver = event => {
    clearInterval(this.slideShowInterval);
    event.target.addEventListener('mouseout', this.slideShow, { once: true });
  };

  slideShow = () => {
    this.slideShowInterval = setInterval(() => this.switchSlide(-1), this.slideShowDelay);
  };

  movingSwitchSlide = direction => {
    if (!this.isSwitching) {
      this.isSwitching = true;
      const slides = [...this.slidesContainer.children];

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

  fadingSwitchSlide = direction => {
    if (!this.isSwitching) {
      this.isSwitching = true;
      this.slidesContainer.style.transition = 'opacity .2s ease';
      const slides = [...this.slidesContainer.children];

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
}
