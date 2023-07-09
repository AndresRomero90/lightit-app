import { SyntheticEvent } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/datepicker.css';

type Props = {
  onChange: (date: Date | null, event?: SyntheticEvent<any | Event>) => void;
  label: string;
  name: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  value?: Date;
};

const DatePicker: React.FC<Props> = ({
  onChange,
  label,
  name,
  error,
  touched = false,
  value = new Date(),
}) => {
  return (
    <div>
      <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className='mt-2'>
        <ReactDatePicker
          showYearDropdown
          name={name}
          selected={value}
          onChange={onChange}
          dateFormat='yyyy-MM-dd'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 min-h-fit p-2.5'
        />
        {touched && error && (
          <div className='text-red-700 font text-xs flex'>{error}</div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
