export class ApiClient {
  constructor () {
    this.baseUrl = 'http://localhost:3000/api';
  }

  async getAllPosts () {
    return await fetch(`${this.baseUrl}/list`).then(response => response.json());
  }

  async addNewPost (body) {
    return await fetch(`${this.baseUrl}/create-article`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
