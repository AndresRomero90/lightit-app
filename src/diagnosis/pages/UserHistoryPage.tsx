import { useUserData } from '../../auth/hooks/useUserData';
import { Layout } from '../../shared/components/Layout';
import { CaseCard } from '../components/CaseCard';
import { UserInfoItem } from '../components/UserInfoItem';
import { useDiagnosisHistory } from '../hooks/useDiagnosisHistory';
import { useSymptoms } from '../hooks/useSymptoms';

const UserHistoryPage: React.FC = () => {
  const userData = useUserData();
  const { cases, refetch } = useDiagnosisHistory();
  const symptoms = useSymptoms();

  const mapIdsToSymptoms = (ids: number[]) => {
    return ids.map((id) => {
      const foundSymptom = symptoms?.find((symptom) => symptom.ID === id);
      return foundSymptom;
    });
  };

  return (
    <Layout>
      <div className='w-6/12 flex flex-col'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4'>User data</h2>
        <div className='flex flex-col content-start'>
          <UserInfoItem label='Name'>{`${userData?.firstName || ''} ${
            userData?.lastName || ''
          }`}</UserInfoItem>
          <UserInfoItem label='Email'>{userData?.email || ''}</UserInfoItem>
          <UserInfoItem label='Gender'>{userData?.gender || ''}</UserInfoItem>
          <UserInfoItem label='Date of Birth'>
            {new Intl.DateTimeFormat('en', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(userData?.dateOfBirth)}
          </UserInfoItem>
        </div>
        {cases.map((item, idx) => (
          <div className='flex flex-col gap-4' key={idx}>
            <CaseCard
              diagnosis={item.diagnosis}
              symptoms={mapIdsToSymptoms(item.symptoms)}
              onConfirm={refetch}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default UserHistoryPage;
