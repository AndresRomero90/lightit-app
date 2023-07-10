import React from 'react';

interface Props {
  accuracy: string;
}

export const AccuracyIndicator: React.FC<Props> = ({ accuracy }) => {
  return (
    <div
      className='bg-slate-200 h-6 rounded-lg overflow-hidden border border-slate-400'
      title={`${Number(accuracy).toFixed(2)}%`}>
      <div
        className='h-full bg-blue-600 shadow-lg'
        style={{ width: `${accuracy}%` }}></div>
    </div>
  );
};
