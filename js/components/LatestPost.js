import {Post} from './Post.js';

export class LatestPost extends Post {
  formatShortDescription = (description, type) => {
    // removing tags from the description
    description = description.replace(/<[/a-z1-5\s="'_-]+>/gmi, '');
    const MAX_DESCRIPTION_LENGTH = type === 'text' ? 600 : 207;
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}…`;
    }
    return description;
  };

  renderPost = () => {
    const {
      id,
      title,
      date,
      pictureLink,
      description,
      comments,
      type,
      timeToRead,
    } = this._postData;

    const postHtml = `
      <article class="latest-post latest-post--${type}-post">
        ${pictureLink ?
          `<img class="latest-post__picture" src="${pictureLink}" alt="LargePost Image">` :
          ''}
        <h4 class="latest-post__headline">
          <a class="latest-post__headline-link" href="./post.html?id=${id}">${title}</a>
        </h4>
        <p class="latest-post__content">${this.formatShortDescription(description, type)}</p>
        <div class="latest-post__details">
          <time datetime="${new Date(date).toLocaleDateString()}">
            ${this.formatDate(new Date(date))}
          </time>
          <span class="middot">&middot;</span>
          ${timeToRead} min read
          <span class="middot">&middot;</span>
          <img src="img/a-icon-comment.svg" alt="Comment icon"> ${comments.length}
        </div>
      </article>
    `;

    this._postContainer.insertAdjacentHTML('beforeend', postHtml);
  }
}
