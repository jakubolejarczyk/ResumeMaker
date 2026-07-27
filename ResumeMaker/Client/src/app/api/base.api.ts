export class BaseApi {
  private readonly API_URL = 'http://localhost:5038/api';

  protected getUserEndpoint(userId?: number) {
    const endpoint = `${this.API_URL}/user`;
    return userId ? `${endpoint}/${userId}` : endpoint;
  }
}
