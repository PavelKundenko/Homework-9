import { blogPostComponent } from './components/blog-post.js';
import { ApiClient } from './helpers/api-client.js';

const apiClient = new ApiClient();
const blogPostsContainer = document.querySelector('.blog__posts');

apiClient.getAllPosts()
  .then(posts => posts.forEach(postData => {
    blogPostsContainer.insertAdjacentHTML('beforeend', blogPostComponent(postData));
  }))
  .catch(error => console.error(error));
