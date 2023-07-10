export const SymptomPill: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <span className='bg-sky-600 rounded-3xl shadow-lg text-slate-200 font-bold py-1 px-2'>
      {children}
    </span>
  );
};
