import { ApiClient } from './helpers/ApiClient.js';

class PostCreator {
  constructor (form) {
    this.postCreationForm = form;
    this.postCreationForm.addEventListener('submit', this.handleFormSubmit);
    this.helbBtn = this.postCreationForm.querySelector('.form__show-help');
    this.helbBtn.addEventListener('click', this.handleShowHelp);
    this.errorsContainer = this.postCreationForm.querySelector('.form__errors');
  }

  apiClient = new ApiClient();

  getPostsLength = async () => {
    const posts = await this.apiClient.getAllPosts();
    return posts.length;
  };

  countTimeForReading = textData => {
    const AVERAGE_READING_SPEED = 160;
    const wordsQuantity = textData.split(' ').length;
    return Math.round(wordsQuantity / AVERAGE_READING_SPEED);
  };

  handleShowHelp = () => {
    const helpBlock = document.querySelector('.form__help');
    helpBlock.classList.toggle('form__help--hidden');
  };

  showError = errorMessage => this.errorsContainer.insertAdjacentHTML('beforeend', errorMessage);

  hideErrors = () => {
    this.errorsContainer.innerHTML = '';
  };

  extractFormData = () => [...this.postCreationForm].reduce((data, formElem) => {
    const currentData = data;
    if (formElem.type !== 'submit') {
      currentData[formElem.name] = formElem.value.trim();
    }
    return currentData;
  }, {});

  validateForm = postData => {
    const validationResult = {
      isValid: true,
      errors: ''
    };

    const postTitleRegExp = /^[A-Z][a-z\s.,:!?-]{1,19}/gm;
    if (!postTitleRegExp.test(postData.title)) {
      validationResult.isValid = false;
      validationResult.errors += 'Title is not valid.<br>';
    }
    return validationResult;
  };

  formatPostData = async postData => {
    // if description doesn't include any paragraph we'll wrap all description in one paragraph
    const paragraphRegExp = /<[/p]+>/gmi;
    if (!paragraphRegExp.test(postData.description)) {
      postData.description = `<p>${postData.description}</p>`;
    }

    // adding classes for stylization
    postData.description = postData.description
      .replace(/<p>/gm, '<p class="post__text">')
      .replace(/<h[1-5]>/gm, '<h2 class="post__secondary-headline">');

    return {
      id: await this.getPostsLength(),
      authorAvatar: 'img/Alex.png',
      rate: 0,
      timeToRead: this.countTimeForReading(postData.description) || 1,
      comments: [],
      date: new Date(postData.date),
      ...postData
    };
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const postData = this.extractFormData();
    const validationResult = this.validateForm(postData);
    if (!validationResult.isValid) {
      this.showError(validationResult.errors);
    } else {
      this.hideErrors();
      const formattedData = await this.formatPostData(postData);
      this.apiClient.addNewPost(formattedData)
        .then(() => {
          const newPath = location.pathname.replace(/[a-zA-Z-]+\.html/gm, 'post.html');
          location.href = `${newPath}?id=${formattedData.id}`;
        })
        .catch(() => this.showError('Server error has occurred. Try again later.'));
    }
  }
}

const postCreator = new PostCreator(document.querySelector('.create-post-form'));
console.log(postCreator); // just for an avoiding linter error
