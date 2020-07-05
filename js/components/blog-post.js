import { formatDate, formatShortDescription, convertRateToHtml } from '../helpers/format-utils.js';

export const blogPostComponent = ({ id, title, author, description, pictureLink, type, date, timeToRead, comments, rate }) => `
  <div class="post blog-post blog-post--${type}-post" data-id="${id}">
    ${
      type !== 'text'
      ? `<div class="post__image-container"><img class="post__image" src="${pictureLink}" alt="Post Image"></div>`
      : ''
    }
    <div class="post__type"></div>
    <article class="post__content">
      <div class="post__info">
        <img class="post__author-avatar" src="img/Neil.png" alt="Author avatar">
        <div>
          <h4 class="post__author-name">${author}</h4>
          <div class="post__details">
            <time datetime="2019-11-20">${formatDate(new Date(date))}</time>
            <span class="middot">&middot;</span> ${timeToRead} min read <span class="middot">&middot;</span>
            <img src="img/a-icon-comment.svg" alt="Comment icon"> ${comments.length}
            <div class="rate">
              ${convertRateToHtml(rate)}
            </div>
          </div>
        </div>
      </div>
      <h3 class="post__headline">${title}</h3>
      ${type === 'audio' ? '<audio controls class="post__audio"></audio>' : ''}
      <p class="post__text">${formatShortDescription(description, type)}</p>
      <button class="post__read-more">Read more</button>
    </article>
  </div>
`;
