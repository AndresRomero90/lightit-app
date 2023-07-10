import { useEffect, useState } from 'react';
import { DiagnosisApi } from '../api/diagnosis.api';
import { Symptom } from '../interfaces/Symptom';

export const useSymptoms = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>();

  useEffect(() => {
    DiagnosisApi.getInstance()
      .getSymptoms()
      .then((response) => {
        setSymptoms(response.data.symptoms);
      })
      .catch(console.error);
  }, []);

  return symptoms;
};
