import { apiInstance } from '../../shared/api/lightit-api';

export class AuthHttpService {
  static myInstance: AuthHttpService | null = null;
  myApiInstance?: ReturnType<typeof apiInstance>;
  myApiAuthInstance?: ReturnType<typeof apiInstance>;

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new AuthHttpService();
    }
    return this.myInstance;
  }

  api() {
    const accessToken = localStorage.getItem('token') || '';

    const axiosInstance = apiInstance(accessToken);

    this.myApiAuthInstance = axiosInstance;
    return this.myApiAuthInstance;
  }
}
