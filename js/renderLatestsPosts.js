import {ApiClient} from './helpers/ApiClient.js';
import {LatestPost} from './components/LatestPost.js';

const apiClient = new ApiClient();

apiClient.getAllPosts()
    .then((posts) => {
      const latestPosts = document.querySelector('.latest-posts-container');
      posts.slice(0, 3).forEach((postData) => {
        const latestPost = new LatestPost(latestPosts, postData);

        latestPost.renderPost();
      });
    })
    .catch((error) => console.log(error));
