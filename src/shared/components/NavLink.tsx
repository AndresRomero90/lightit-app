import clsx from 'clsx';
import { NavLink as ReactNavLink } from 'react-router-dom';

interface Props {
  to: string;
}

export const NavLink: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  to,
}) => {
  return (
    <ReactNavLink to={to}>
      {({ isActive }) => {
        const labelClasses = clsx(
          'text-slate-600 hover:text-slate-800 active:text-slate-950',
          {
            'text-slate-950 font-bold': isActive,
          }
        );
        return <span className={labelClasses}>{children}</span>;
      }}
    </ReactNavLink>
  );
};
