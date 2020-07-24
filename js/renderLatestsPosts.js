// import Slider from './helpers/slider.js';
import { ApiClient } from './helpers/api-client.js';
import { LatestPost } from './components/LatestPost.js';

// const slider1Config = {
//   slidesContainer: document.querySelector('.portfolio__slider'),
//   nextControl: document.querySelector('.portfolio-controllers__arrow--next'),
//   prevControl: document.querySelector('.portfolio-controllers__arrow--prev'),
//   slideShowDelay: 5000
// };
//
// const slider1 = new Slider(slider1Config);

// const slider2Config = {
//   slidesContainer: document.querySelector('.testimonials__slider'),
//   nextControl: document.querySelector('.testimonials__arrow--right'),
//   prevControl: document.querySelector('.testimonials__arrow--left'),
//   slideShow: false,
//   moving: false
// };

// const slider2 = new Slider(slider2Config);

const apiClient = new ApiClient();
apiClient.getAllPosts()
  .then(posts => {
    const latestPosts = document.querySelector('.latest-posts-container');
    posts.slice(0, 3).forEach(postData => {
      const latestPost = new LatestPost(latestPosts, postData);
      latestPost.renderPost();
    });
  })
  .catch(error => console.log(error));
