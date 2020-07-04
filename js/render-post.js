import { postComponent } from './components/post.js';
import { ApiClient } from './helpers/api-client.js';
const apiClient = new ApiClient();

const postId = location.href.split('uuid=')[1];
apiClient.getAllPosts()
  .then(posts => {
    const postData = posts.find(post => post.id === postId);
    const postContainer = document.querySelector('.large-post-container');
    postContainer.insertAdjacentHTML('afterbegin', postComponent(postData));
  })
  .catch(error => console.log(error));
