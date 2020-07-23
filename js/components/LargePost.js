import { Post } from './Post.js';

export class LargePost extends Post {
  countPassedTimeFromDate = date => {
    const MILLISECONDS_IN_DAY = 86400000;
    const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_DAY / 24;
    const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_HOUR / 60;

    const passedTime = new Date().getTime() - date.getTime();
    if (passedTime > MILLISECONDS_IN_DAY) {
      return `${Math.floor(passedTime / MILLISECONDS_IN_DAY)} days`;
    } else if (passedTime > MILLISECONDS_IN_HOUR) {
      return `${Math.floor(passedTime / MILLISECONDS_IN_HOUR)} hours`;
    } else {
      return `${Math.floor(passedTime / MILLISECONDS_IN_MINUTE)} min`;
    }
  };

  renderComments = () => this.postData.comments.reduce((prevComments, { author, authorAvatar, text, rate, date }, index, comments) => prevComments + `
    <li class="post__comment ${index + 1 === comments.length ? 'post__comment--last' : ''}">
      <img src="${authorAvatar}" alt="Comment author avatar" class="post__comment-author-avatar">
      <div class="post__comment-info">
        <h4 class="post__comment-author-name">${author}</h4>
        <div class="rate">${this.convertRateToHtml(rate)}</div>
        <div class="post__comment-time">
          <img class="post__time-icon" src="img/a-icon-time.svg" alt="Clock icon"> ${this.countPassedTimeFromDate(new Date(date))} ago
        </div>
      </div>
      <p class="post__comment-text">${text}</p>
      <a class="post__comment-link" href="#">Read more</a>
    </li>
  `, '');

  renderPost = () => {
    const { title, author, authorAvatar, date, pictureLink, description, quotation, comments, type, timeToRead, rate } = this.postData;
    const postHTML = `
      <article class="post large-post large-post--${type}-post">
         <h1 class="post__primary-headline">${title}</h1>
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
         <div class="post__image-container">
           ${pictureLink ? `<img class="post__image" src="${pictureLink}" alt="Post Image">` : ''}
         </div>
         ${type === 'audio' ? '<audio controls class="post__audio"></audio>' : ''}
         ${description}
         ${quotation ? `<blockquote class="post__blockquote"><p>${quotation}</p></blockquote>` : ''}
         
        <footer class="post__footer">
          <div class="post__footer-bar">
            <div class="post__likes">
              <img src="img/a-icon-like-1.svg" alt="Like icon" class="like-icon"> 0 likes
            </div>
            <div class="post__icons icons">
              <img src="img/a-icon-facebook.svg" alt="Social Icon" class="icon">
              <img src="img/a-icon-dribbble.svg" alt="Social Icon" class="icon">
              <img src="img/a-icon-instagram.svg" alt="Social Icon" class="icon">
            </div>
          </div>
          <section class="post__comments">
            <h2 class="post__secondary-headline">
              ${comments.length ? 'Reviews' : 'This post has no comments yet.'}
            </h2>
            ${comments.length
            ? `<ul class="post__comments-list">${this.renderComments()}</ul>
              <div class="post__comments-button">
                <button class="post__more-comments">More comments</button>
              </div>`
            : ''}
            
          </section>
        </footer>
       </article>
    `;
    this.postContainer.insertAdjacentHTML('afterbegin', postHTML);
  };
}
