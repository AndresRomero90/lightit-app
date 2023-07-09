import { apiInstance } from '../api/lightit-api';

export class HttpService {
  static myInstance: HttpService | null = null;
  myApiInstance?: ReturnType<typeof apiInstance>;
  myApiAuthInstance?: ReturnType<typeof apiInstance>;

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new HttpService();
    }
    return this.myInstance;
  }

  api() {
    this.myApiInstance = apiInstance();
    return this.myApiInstance;
  }
}
