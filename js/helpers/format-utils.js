export function formatDate (date) {
  const addZero = num => num < 10 ? '0' + num : num;
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'dec'];
  return `${addZero(date.getDate())} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export function formatShortDescription (description, type) {
  description = description.replace(/<[/a-z1-5\s="_-]+>/gmi, '');
  const maxDescriptionLength = {
    AUDIO: 125,
    VIDEO: 210,
    PHOTO: 220,
    TEXT: 550
  };

  if (description.length > maxDescriptionLength[type.toUpperCase()]) {
    return `${description.substring(0, maxDescriptionLength[type.toUpperCase()])} ...`;
  } else {
    return description;
  }
}

export function convertRateToHtml (rate) {
  const rateStarsElements = {
    star: '<img src="img/Star.svg" alt="Rate Star" class="rate__star">',
    halfOfStar: '<img src="img/HalfStar.svg" alt="Rate Star" class="rate__star">',
    emptyStar: '<img src="img/Star-1.svg" alt="Rate Star" class="rate__star">'
  };
  const MAX_RATE = 5;

  let rateHtml = rateStarsElements.star.repeat(rate);
  if (Number.isInteger(rate)) {
    rateHtml += rateStarsElements.emptyStar.repeat(MAX_RATE - rate);
  } else {
    rateHtml = rateHtml + rateStarsElements.halfOfStar + rateStarsElements.emptyStar.repeat(MAX_RATE - rate);
  }
  return rateHtml;
}
