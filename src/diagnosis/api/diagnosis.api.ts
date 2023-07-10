import { AuthHttpService } from '../../auth/services/auth-http-service';
import { DiagnosisHistoryResponse } from '../interfaces/DiagnosisHistoryResponse';
import { DiagnosisResponse } from '../interfaces/DiagnosisResponse';
import { SymptomsResponse } from '../interfaces/SymptomsResponse';

export class DiagnosisApi {
  private static myInstance: DiagnosisApi | null = null;
  private static SYMPTOMS_BASE_URL = '/symptoms';
  private static DIAGNOSIS_BASE_URL = '/diagnosis';
  private static DIAGNOSIS_HISTORY_BASE_URL = '/diagnosis/history';
  private static DIAGNOSIS_CONFIRM_BASE_URL = '/diagnosis/confirm';

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new DiagnosisApi();
    }
    return this.myInstance;
  }

  get diagnosisApiService() {
    return AuthHttpService.getInstance().api();
  }

  async getSymptoms() {
    return await this.diagnosisApiService.get<SymptomsResponse>(
      DiagnosisApi.SYMPTOMS_BASE_URL
    );
  }

  async getDiagnosis(symptoms: number[]) {
    return await this.diagnosisApiService.post<DiagnosisResponse>(
      DiagnosisApi.DIAGNOSIS_BASE_URL,
      {
        symptoms,
      }
    );
  }

  async getDiagnosisHistory() {
    return await this.diagnosisApiService.get<DiagnosisHistoryResponse>(
      DiagnosisApi.DIAGNOSIS_HISTORY_BASE_URL
    );
  }

  async confirmDiagnosis(diagnosisId: number) {
    return await this.diagnosisApiService.patch(
      DiagnosisApi.DIAGNOSIS_CONFIRM_BASE_URL,
      { diagnosis_id: diagnosisId }
    );
  }
}
