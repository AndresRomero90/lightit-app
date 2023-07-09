import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

type Props = {
  label: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  label,
  type,
  onClick,
  disabled,
  className,
}) => {
  const buttonClasses = clsx(
    'rounded bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 active:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
    className,
    {
      'bg-gray-400 hover:bg-gray-400 hover:cursor-not-allowed': disabled,
    }
  );
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={buttonClasses}>
      {label}
    </button>
  );
};

export default Button;
