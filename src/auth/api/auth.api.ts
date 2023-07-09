import { HttpService } from '../../shared/services/http-service';
import { LoginResponse } from '../interfaces/LoginResponse';
import { MyselfResponse } from '../interfaces/MyselfResponse';
import { RegisterResponse } from '../interfaces/RegisterResponse';
import { AuthHttpService } from '../services/auth-http-service';

export class AuthApi {
  private static myInstance: AuthApi | null = null;
  private static AUTH_BASE_URL = '/auth';

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new AuthApi();
    }
    return this.myInstance;
  }

  get authApiService() {
    return HttpService.getInstance().api();
  }

  get authenticatedAuthApiService() {
    return AuthHttpService.getInstance().api();
  }

  async login(email: string, password: string) {
    return await this.authApiService.post<LoginResponse>(
      `${AuthApi.AUTH_BASE_URL}/login`,
      {
        email,
        password,
      }
    );
  }

  async register(
    firstName: string,
    lastName: string,
    gender: 'male' | 'female',
    dateOfBirth: Date,
    email: string,
    password: string
  ) {
    return await this.authApiService.post<RegisterResponse>(
      `${AuthApi.AUTH_BASE_URL}/register`,
      {
        first_name: firstName,
        last_name: lastName,
        gender,
        date_of_birth: dateOfBirth,
        email,
        password,
      }
    );
  }

  async logout() {
    return await this.authenticatedAuthApiService.post(
      `${AuthApi.AUTH_BASE_URL}/logout`
    );
  }

  async myself() {
    return await this.authenticatedAuthApiService?.get<MyselfResponse>(
      `${AuthApi.AUTH_BASE_URL}/me`
    );
  }
}
