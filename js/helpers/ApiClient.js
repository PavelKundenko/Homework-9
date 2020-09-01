export class ApiClient {
  static BASE_URL = 'http://localhost:3000/api';

  static instance = null;

  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    } else {
      ApiClient.instance = this;

      return this;
    }
  }

  getAllPosts = () => fetch(`${ApiClient.BASE_URL}/list`).then((response) => response.json());

  addNewPost = (body) => (
    fetch(`${ApiClient.BASE_URL}/create-article`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
}
