export interface Diagnosis {
  id: number;
  name: string;
  issue_id: number;
  case_id: number;
  symptoms: number[];
  accuracy: number;
  confirmed: boolean;
}
