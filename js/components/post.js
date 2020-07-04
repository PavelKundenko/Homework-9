import { convertRateToHtml, formatDate } from '../helpers/formatUtils.js';

export const postComponent = ({ title, author, date, pictureLink, description, quotation, comments, type, timeToRead, rate }) => `
   <article class="post large-post">
     <h1 class="post__primary-headline">${title}</h1>
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
     ${pictureLink
      ? `<div class="post__image-container"><img class="post__image" src="${pictureLink}" alt="Post Image"></div>` : ''}
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
      </section>
    </footer>
   </article>
`;
