import { PostCreator } from './classes/PostCreator.js';

const createPost = new PostCreator(document.querySelector('.create-post-form'));
console.log(createPost); // just for an avoiding linter error
