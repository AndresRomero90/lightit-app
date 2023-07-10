import Button from '../../shared/components/Button';
import { DiagnosisApi } from '../api/diagnosis.api';
import { Diagnosis } from '../interfaces/Diagnosis';
import { Symptom } from '../interfaces/Symptom';
import { DiagnosisCard } from './DiagnosisCard';
import { SymptomPill } from './SymptomPill';

interface Props {
  symptoms: (Symptom | undefined)[];
  diagnosis: Diagnosis[];
  onConfirm: () => void;
}

export const CaseCard: React.FC<Props> = ({
  symptoms,
  diagnosis,
  onConfirm,
}) => {
  const handleConfirm = (diagnosisId: number) => {
    DiagnosisApi.getInstance()
      .confirmDiagnosis(diagnosisId)
      .then((response) => {
        if (response.status === 204) {
          onConfirm();
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <hr className='my-8 border-t border-slate-800' />
      <div className='flex flex-row gap-2'>
        {symptoms.map((symptom, idx) => (
          <SymptomPill key={idx}>{symptom?.Name}</SymptomPill>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        {diagnosis.map((item) => (
          <div key={item.id} className='flex flex-row gap-2 w-full'>
            <DiagnosisCard name={item.name} accuracy={item.accuracy} />
            <Button
              disabled={diagnosis.some((item) => item.confirmed)}
              type='button'
              label={item.confirmed ? 'Confirmed' : 'Confirm'}
              className='w-40'
              onClick={() => {
                handleConfirm(item.id);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
