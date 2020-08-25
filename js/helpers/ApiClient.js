export class ApiClient {
  constructor () {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }
    ApiClient.instance = this;
    return this;
  }

  baseUrl = 'http://localhost:3000/api';

  getAllPosts = async () => await fetch(`${this.baseUrl}/list`).then(response => response.json());

  addNewPost = async (body) => await fetch(`${this.baseUrl}/create-article`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
