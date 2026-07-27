export class BaseApi {
  private readonly API_URL = 'http://localhost:5038/api';

  protected getUserEndpoint() {
    return `${this.API_URL}/user`;
  }
}
