import {BlogPost} from './components/BlogPost.js';
import {ApiClient} from './helpers/ApiClient.js';

const apiClient = new ApiClient();
const blogPostsContainer = document.querySelector('.blog__posts');

apiClient.getAllPosts()
    .then((posts) => posts.forEach((postData) => {
      const blogPost = new BlogPost(blogPostsContainer, postData);
      blogPost.renderPost();
    }))
    .catch((error) => console.error(error));
