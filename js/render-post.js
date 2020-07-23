import { LargePost } from './components/LargePost.js';
import { ApiClient } from './helpers/api-client.js';
const apiClient = new ApiClient();

const postId = location.href.split('id=')[1];
apiClient.getAllPosts()
  .then(posts => {
    console.log(posts);
    const postData = posts.find(post => post.id === Number(postId));
    const postContainer = document.querySelector('.large-post-container');
    const post = new LargePost(postContainer, postData);
    post.renderPost();
  })
  .catch(error => console.log(error));
