interface Props {
  label: string;
}

export const UserInfoItem: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  label,
}) => {
  return (
    <p className='text-slate-600'>
      <span className='font-semibold text-lg text-slate-800'>{label}: </span>
      {children}
    </p>
  );
};
