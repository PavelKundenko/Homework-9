export class Post {
  constructor(postContainer, postData) {
    this._postContainer = postContainer;
    this._postData = postData;
  }

  static MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'dec'];

  static MAX_RATE = 5;

  formatDate = (date) => {
    const addZero = (num) => num < 10 ? '0' + num : num;

    return `${addZero(date.getDate())} ${Post.MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
  };

  convertRateToHtml = (rate) => {
    const rateStarsElements = {
      star: '<img src="img/Star.svg" alt="Rate Star" class="rate__star">',
      halfOfStar: '<img src="img/HalfStar.svg" alt="Rate Star" class="rate__star">',
      emptyStar: '<img src="img/Star-1.svg" alt="Rate Star" class="rate__star">',
    };

    let rateHtml = rateStarsElements.star.repeat(rate);

    if (Number.isInteger(rate)) {
      rateHtml += rateStarsElements.emptyStar.repeat(Post.MAX_RATE - rate);
    } else {
      rateHtml = rateHtml +
        rateStarsElements.halfOfStar +
        rateStarsElements.emptyStar.repeat(Post.MAX_RATE - rate);
    }

    return rateHtml;
  };

  renderPost = () => this._postContainer.insertAdjacentHTML('afterbegin', '');
}
