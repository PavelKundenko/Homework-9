import { Post } from './Post.js';

export class BlogPost extends Post {
  formatShortDescription = (description, type) => {
    // removing tags from the description
    description = description.replace(/<[/a-z1-5\s="'_-]+>/gmi, '');

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
  };

  renderPost = () => {
    const { id, title, author, authorAvatar, description, pictureLink, type, date, timeToRead, comments, rate } = this._postData;
    const postHTML = `
      <div class="post blog-post blog-post--${type}-post" data-id="${id}">
      ${
        pictureLink
        ? `<div class="post__image-container"><img class="post__image" src="${pictureLink}" alt="Post Image"></div>`
        : ''
      }
        <div class="post__type"></div>
        <article class="post__content">
          <div class="post__info">
            <img class="post__author-avatar" src="${authorAvatar}" alt="Author avatar">
            <div>
              <h4 class="post__author-name">${author}</h4>
              <div class="post__details">
                <time datetime="2019-11-20">${this.formatDate(new Date(date))}</time>
                <span class="middot">&middot;</span> ${timeToRead} min read <span class="middot">&middot;</span>
                <img src="img/a-icon-comment.svg" alt="Comment icon"> ${comments.length}
                <div class="rate">
                  ${this.convertRateToHtml(rate)}
                </div>
              </div>
            </div>
          </div>
          <h3 class="post__headline">${title}</h3>
          ${type === 'audio' ? '<audio controls class="post__audio"></audio>' : ''}
          <p class="post__text">${this.formatShortDescription(description, type)}</p>
          <a href="./post.html?id=${id}"><button class="post__read-more">Read more</button></a>
        </article>
      </div>
    `;
    this._postContainer.insertAdjacentHTML('beforeend', postHTML);
  };
}
