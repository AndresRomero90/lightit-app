import clsx from 'clsx';
import ReactSelect, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  PropsValue,
  SingleValue,
} from 'react-select';

interface Option {
  label: string;
  value: number | string;
}

interface Props {
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  label: string;
  name: string;
  onChange: (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta?: ActionMeta<Option>
  ) => void;
  values?: PropsValue<Option> | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  isMulti?: boolean;
  required?: boolean;
  className?: string;
}

const Select: React.FC<Props> = ({
  label,
  options,
  name,
  values,
  touched,
  error,
  required = false,
  isMulti = false,
  onChange,
  className,
}) => {
  const selectClasses = clsx(
    'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
    {
      'basic-multi-select': isMulti,
    }
  );

  const labelClasses = clsx('text-sm font-medium leading-6 text-gray-900', {
    "after:content-['*'] after:ml-0.5 after:text-red-500": required,
  });
  return (
    <div className={className}>
      <label className={labelClasses}>{label}</label>
      <div className='mt-2'>
        <ReactSelect
          className={selectClasses}
          classNamePrefix='select'
          isSearchable={true}
          name={name}
          options={options}
          isMulti={isMulti}
          onChange={onChange}
          styles={{
            control(base) {
              return { ...base, minHeight: '2rem!important', color: 'grey' };
            },
            option: (provided) => ({
              ...provided,
              color: 'grey',
            }),
          }}
          value={values}
        />
      </div>
      {touched && error && (
        <div className='text-red-700 font text-xs flex'>{error}</div>
      )}
    </div>
  );
};

export default Select;
