import {BlogPost} from './components/BlogPost.js';
import {ApiClient} from './helpers/ApiClient.js';

const apiClient = new ApiClient();

apiClient.getAllPosts()
    .then((posts) => posts.forEach((postData) => {
      const blogPostsContainer = document.querySelector('.blog__posts');
      const blogPost = new BlogPost(blogPostsContainer, postData);

      blogPost.renderPost();
    }))
    .catch((error) => console.error(error));
