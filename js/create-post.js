import { generateUuid, countTimeForReading } from './helpers/count-utils.js';
import { ApiClient } from './helpers/api-client.js';
const apiClient = new ApiClient();
const helpBtn = document.getElementById('help-btn');

helpBtn.addEventListener('click', () => {
  const helpBlock = document.querySelector('.form__help');
  helpBlock.classList.toggle('form__help--hidden');
});

const createPostForm = document.getElementById('create-post-form');
createPostForm.addEventListener('submit', event => {
  event.preventDefault();

  const postTitleRegExp = /^[A-Z][a-z\s.,:!?-]{1,19}/gm;
  const postTitleField = document.getElementById('post-title');

  const formattedPostContent = createPostForm['post-content'].value
    .replace(/<p>/gm, '<p class="post__text">')
    .replace(/<h2>/gm, '<h2 class="post__secondary-headline">');

  if (postTitleRegExp.test(postTitleField.value)) {
    const postData = {
      id: generateUuid(),
      title: postTitleField.value,
      author: createPostForm['author-name'].value,
      pictureLink: createPostForm['post-picture'].value,
      rate: 0,
      type: createPostForm['post-type'].value,
      description: formattedPostContent,
      quotation: createPostForm['post-quotation'].value,
      date: new Date(),
      timeToRead: countTimeForReading(createPostForm['post-content'].value + createPostForm['post-quotation'].value),
      comments: []
    };

    apiClient.addNewPost(postData)
      .then(() => {
        const newPath = location.pathname.replace(/[a-zA-Z-]+\.html/gm, 'post.html');
        location.href = `${newPath}?uuid=${postData.id}`;
      })
      .catch(error => console.error(error));
  } else {
    alert('Enter correct post title');
  }
});
