import { useEffect, useState } from 'react';
import { Case } from '../interfaces/Case';
import { DiagnosisApi } from '../api/diagnosis.api';

export const useDiagnosisHistory = () => {
  const [cases, setCases] = useState<Case[]>([]);

  const [_key, set_Key] = useState(0);

  const refetch = () => {
    set_Key((curValue) => curValue + 1);
  };

  useEffect(() => {
    DiagnosisApi.getInstance()
      .getDiagnosisHistory()
      .then((response) => {
        if (response.status === 200) {
          setCases(response.data.cases);
        }
      })
      .catch(console.error);
  }, [_key]);

  return { cases, refetch };
};
