import {ApiClient} from '../helpers/ApiClient.js';

export class PostCreator {
  apiClient = new ApiClient();

  constructor(form) {
    this.postCreationForm = form;
    this.helbBtn = this.postCreationForm.querySelector('.form__show-help');
    this.errorsContainer = this.postCreationForm.querySelector('.form__errors');

    this.postCreationForm.addEventListener('submit', this.handleFormSubmit);

    this.helbBtn.addEventListener('click', this.handleShowHelp);
  }

  static AVERAGE_READING_SPEED = 160;

  countTimeForReading = (textData) => {
    const wordsQuantity = textData.split(' ').length;

    return Math.round(wordsQuantity / PostCreator.AVERAGE_READING_SPEED);
  };

  getPostsLength = async () => {
    const posts = await this.apiClient.getAllPosts();

    return posts.length;
  };

  handleShowHelp = () => {
    const helpBlock = document.querySelector('.form__help');
    helpBlock.classList.toggle('form__help--hidden');
  };

  showError = (errorMessage) => this.errorsContainer.insertAdjacentHTML('beforeend', errorMessage);

  hideErrors = () => {
    this.errorsContainer.innerHTML = '';
  };

  extractFormData = () => (
    Array.from(this.postCreationForm).reduce((data, formElement) => {
      if (formElement.type !== 'submit') {
        return {
          ...data,
          [formElement.name]: formElement.value.trim(),
        };
      } else {
        return data;
      }
    }, {})
  );

  validateForm = (postData) => {
    const validationResult = {
      isValid: true,
      errors: '',
    };

    const postTitleRegExp = /^[A-Z][a-z\s.,:!?-]{1,19}/gm;

    if (!postTitleRegExp.test(postData.title)) {
      validationResult.isValid = false;
      validationResult.errors += 'Title is not valid.<br>';
    }

    return validationResult;
  };

  formatPostData = async (postData) => {
    const paragraphRegExp = /<[/p]+>/gmi;

    if (!paragraphRegExp.test(postData.description)) {
      postData.description = `<p>${postData.description}</p>`;
    }

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
      ...postData,
    };
  };

  handleFormSubmit = async (event) => {
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
