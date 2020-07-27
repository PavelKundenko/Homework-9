import { ApiClient } from './helpers/api-client.js';
const apiClient = new ApiClient();
const helpBtn = document.getElementById('help-btn');

function countTimeForReading(textData) {
  const AVERAGE_READING_SPEED = 160;
  const wordsQuantity = textData.split(' ').length;
  return Math.round(wordsQuantity / AVERAGE_READING_SPEED);
}

const getPostsLength = async () => {
  const posts = await apiClient.getAllPosts();
  return posts.length;
};

helpBtn.addEventListener('click', () => {
  const helpBlock = document.querySelector('.form__help');
  helpBlock.classList.toggle('form__help--hidden');
});

const createPostForm = document.getElementById('create-post-form');

createPostForm.addEventListener('submit', async event => {
  event.preventDefault();

  const postTitleRegExp = /^[A-Z][a-z\s.,:!?-]{1,19}/gm;
  const postTitleField = document.getElementById('post-title');

  if (postTitleRegExp.test(postTitleField.value)) {
    let postContent = createPostForm['post-content'].value;
    const paragraphRegExp = /<[/p]+>/gmi;
    if (!paragraphRegExp.test(postContent)) {
      postContent = `<p class="post__text">${postContent}</p>`;
    }
    const formattedPostContent = postContent
      .replace(/<p>/gm, '<p class="post__text">')
      .replace(/<h[1-5]>/gm, '<h2 class="post__secondary-headline">');

    const postData = {
      id: await getPostsLength(),
      title: postTitleField.value,
      author: createPostForm['author-name'].value,
      authorAvatar: 'img/Alex.png',
      pictureLink: createPostForm['post-picture'].value,
      rate: 0,
      type: createPostForm['post-type'].value,
      description: formattedPostContent,
      quotation: createPostForm['post-quotation'].value,
      date: new Date(),
      timeToRead: countTimeForReading(createPostForm['post-content'].value + createPostForm['post-quotation'].value),
      comments: []
    };

    apiClient
      .addNewPost(postData)
      .then(() => {
        const newPath = location.pathname.replace(/[a-zA-Z-]+\.html/gm, 'post.html');
        location.href = `${newPath}?id=${postData.id}`;
      })
      .catch(error => console.error(error));
  } else {
    alert('Enter correct post title');
    return null;
  }
});
