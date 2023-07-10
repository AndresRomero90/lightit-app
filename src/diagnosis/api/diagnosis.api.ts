import { AuthHttpService } from '../../auth/services/auth-http-service';
import { SymptomsResponse } from '../interfaces/SymptomsResponse';

export class DiagnosisApi {
  private static myInstance: DiagnosisApi | null = null;
  private static SYMPTOMS_BASE_URL = '/symptoms';

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new DiagnosisApi();
    }
    return this.myInstance;
  }

  get callApiService() {
    return AuthHttpService.getInstance().api();
  }

  async getSymptoms() {
    return await this.callApiService.get<SymptomsResponse>(
      DiagnosisApi.SYMPTOMS_BASE_URL
    );
  }
}
