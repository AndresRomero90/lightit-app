import clsx from 'clsx';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface Props {
  label: string;
  type: HTMLInputTypeAttribute;
  name: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  type,
  name,
  className,
  onChange,
  value = '',
  error,
  touched,
  required,
}) => {
  const labelClasses = clsx(
    'block text-sm font-medium leading-6 text-gray-900',
    {
      "after:content-['*'] after:ml-0.5 after:text-red-500": required,
    }
  );
  return (
    <div className={className}>
      <label className={labelClasses}>{label}</label>
      <div className='my-2'>
        <input
          type={type}
          name={name}
          onChange={onChange}
          {...(value ? { value } : {})}
          className='p-2 bg-slate-50 block w-full border border-gray-300 rounded text-slate-800 py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
        />
        {touched && error && (
          <div className='text-red-700 font text-xs flex'>{error}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
