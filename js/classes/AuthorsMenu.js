import {ApiClient} from '../helpers/ApiClient.js';
import {BlogPost} from '../components/BlogPost.js';

export class AuthorsMenu {
  getPostDescription = document.querySelector('.posts-search__post');

  apiClient = new ApiClient();

  constructor(authorsList, {subscribe, publish}) {
    this.authorsList = authorsList;
    this.isVertical = this.authorsList.classList.contains('posts-search__authors-list--vertical');
    this.subscribe = subscribe;
    this.publish = publish;

    this.handleLoad();
  }

  handleLoad = async () => {
    await this.getData();
    this.renderAuthorsList();
    this.subscribe('SET_ACTIVE_AUTHOR', this.handleSetActiveAuthor);
  };

  getData = async () => {
    this.posts = await this.apiClient.getAllPosts();
    this.authors = [...new Set(this.posts.map((post) => post.author))];
  };

  renderAuthorsList = () => {
    this.authorsList.innerHTML = this.authors
        .map((author, index) => this.getAuthorHTML(author, index)).join('');

    this.authorsList.querySelectorAll('.posts-search__author-tag')
        .forEach((elem) => elem.addEventListener('click', this.handleAuthorClick));
  };

  getAuthorHTML = (authorName, id) => `
    <li class="posts-search__author">
      <div class="posts-search__author-tag" data-id="${id}" data-name="${authorName}">
        ${authorName}
      </div>
      ${this.isVertical ? '<ul class="posts-search__posts-list"></ul>' : ''}
    </li>
  `;

  handleAuthorClick = (event) => this.publish('SET_ACTIVE_AUTHOR', event.target.dataset);

  handleSetActiveAuthor = ({id, name}) => {
    const targetElem = this.authorsList.children[id];

    if (this.authorsList.querySelector('.posts-search__author--active') !== targetElem) {
      const posts = this.posts.filter((postData) => postData.author === name);

      const html = posts.map((postData) =>
        `<li class="posts-search__post-name" data-id="${postData.id}">${postData.title}</li>`,
      ).join('');

      const postsList = this.isVertical ?
        targetElem.querySelector('.posts-search__posts-list') :
        this.authorsList.nextElementSibling;

      this.removeActiveAuthor();
      targetElem.classList.add('posts-search__author--active');

      postsList.innerHTML = html;
      postsList.querySelectorAll('.posts-search__post-name')
          .forEach((element) => element.addEventListener('click', this.handlePostClick));
    } else {
      this.removeActiveAuthor();
    }
  };

  removeActiveAuthor = () => {
    const activeItem = this.authorsList.querySelector('.posts-search__author--active');

    if (activeItem) {
      const postsList = this.isVertical ?
        activeItem.querySelector('.posts-search__posts-list') :
        this.authorsList.nextElementSibling;

      activeItem.classList.remove('posts-search__author--active');

      postsList.querySelectorAll('.posts-search__post-name')
          .forEach((element) => element.removeEventListener('click', this.handlePostClick));

      postsList.innerHTML = '';
    }
  };

  handlePostClick = (event) => {
    const postID = Number(event.target.dataset.id);
    const selectedPost = this.posts.find((post) => post.id === postID);
    const post = new BlogPost(this.getPostDescription, selectedPost);

    this.getPostDescription.innerHTML = '';

    post.renderPost();
  }
}
