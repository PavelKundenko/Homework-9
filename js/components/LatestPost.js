import { Post } from './Post.js';

export class LatestPost extends Post {
  formatShortDescription = (description, type) => {
    description = description.replace(/<[/a-z1-5\s="'_-]+>/gmi, '');
    const MAX_DESCRIPTION_LENGTH = type === 'text' ? 600 : 207;
    return description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}…` : description;
  };

  renderPost = () => {
    const { id, title, date, pictureLink, description, comments, type, timeToRead } = this.postData;
    const postHtml = `
      <article class="latest-post latest-post--${type}-post">
        ${pictureLink ? `<img class="latest-post__picture" src="${pictureLink}" alt="LargePost Image">` : ''}
        <h4 class="latest-post__headline"><a class="latest-post__headline-link" href="./post.html?id=${id}">${title}</a></h4>
        <p class="latest-post__content">${this.formatShortDescription(description, type)}</p>
        <div class="latest-post__details">
          <time datetime="${new Date(date).toLocaleDateString()}">${this.formatDate(new Date(date))}</time>
          <span class="middot">&middot;</span> ${timeToRead} min read <span class="middot">&middot;</span>
          <img src="img/a-icon-comment.svg" alt="Comment icon"> ${comments.length}
        </div>
      </article>
    `;
    this.postContainer.insertAdjacentHTML('beforeend', postHtml);
  }
}
