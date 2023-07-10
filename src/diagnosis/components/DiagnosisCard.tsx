import { AccuracyIndicator } from './AccuracyIndicator';

interface Props {
  name: string;
  accuracy: number;
}

export const DiagnosisCard: React.FC<Props> = ({ name, accuracy }) => {
  return (
    <div className='grid grid-cols-2 bg-slate-100 items-center px-4 py-2 rounded-lg shadow-lg'>
      <span className='text-slate-700 font-semibold text-lg'>{name}</span>
      <AccuracyIndicator accuracy={accuracy} />
    </div>
  );
};
