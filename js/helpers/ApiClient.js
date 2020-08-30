export class ApiClient {
  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }
    ApiClient.instance = this;
    return this;
  }

  static BASE_URL = 'http://localhost:3000/api';

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
