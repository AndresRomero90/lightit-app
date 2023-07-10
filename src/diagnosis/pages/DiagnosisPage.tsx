import { useEffect, useState } from 'react';
import { Layout } from '../../shared/components/Layout';
import { useSymptoms } from '../hooks/useSymptoms';
import Select from '../../shared/components/Select';
import Button from '../../shared/components/Button';
import { DiagnosisApi } from '../api/diagnosis.api';
import { DiagnosisCard } from '../components/DiagnosisCard';
import { Diagnosis } from '../interfaces/Diagnosis';

interface SymptomsSelectOption {
  value: number;
  label: string;
}

const DiagnosisPage: React.FC = () => {
  const symptoms = useSymptoms();

  const [mappedSymptoms, setMappedSymptoms] = useState<SymptomsSelectOption[]>(
    []
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState<
    SymptomsSelectOption[]
  >([]);

  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  const [loadingDiagnosis, setLoadingDiagnosis] = useState(true);

  const handleDiagnose = () => {
    const symptomsToDiagnose = selectedSymptoms.map((symptom) => symptom.value);
    setLoadingDiagnosis(true);
    DiagnosisApi.getInstance()
      .getDiagnosis(symptomsToDiagnose)
      .then((response) => {
        setLoadingDiagnosis(false);
        setDiagnosis(response.data.diagnosis);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (symptoms) {
      setMappedSymptoms(() =>
        symptoms.map((symptom) => ({
          value: symptom.ID,
          label: symptom.Name,
        }))
      );
    }
  }, [symptoms]);

  return (
    <Layout>
      <div className='w-6/12 flex flex-col'>
        <Select
          label='Select your symptoms'
          isMulti={true}
          options={mappedSymptoms}
          name='symptoms'
          onChange={(selectedOption) => {
            setSelectedSymptoms(selectedOption as SymptomsSelectOption[]);
          }}
          values={selectedSymptoms}
        />
        <Button
          className='mt-5'
          type='button'
          label='Diagnose'
          onClick={handleDiagnose}
        />

        {!loadingDiagnosis && (
          <>
            <hr className='my-8 border-t border-slate-800' />
            <h3 className='font-bold text-2xl text-slate-950 mb-6'>
              Diagnosis results
            </h3>
            {diagnosis.length > 0 ? (
              <div className='flex flex-col content-start gap-4'>
                {diagnosis.map((item) => (
                  <DiagnosisCard
                    name={item.name}
                    accuracy={item.accuracy}
                    key={item.id}
                  />
                ))}
              </div>
            ) : (
              <span className='font-bold text-xl text-slate-800'>
                There is no diagnosis for your symptoms!
              </span>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default DiagnosisPage;
