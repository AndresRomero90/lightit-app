import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../../auth/api/auth.api';
import Button from './Button';
import { NavLink } from './NavLink';
import {
  DIAGNOSIS_ROUTE,
  LOGIN_ROUTE,
  USER_HISTORY_ROUTE,
} from './NavigationRouter';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className='w-full bg-blue-200 py-4'>
      <nav className='flex flex-row justify-center gap-8 items-center'>
        <NavLink to={DIAGNOSIS_ROUTE}>Diagnosis</NavLink>
        <NavLink to={USER_HISTORY_ROUTE}>User History</NavLink>
        <Button
          type='button'
          label='Log out'
          onClick={() => {
            AuthApi.getInstance()
              .logout()
              .then(() => {
                localStorage.removeItem('token');
                navigate(LOGIN_ROUTE, { replace: true });
              })
              .catch(console.error);
          }}
        />
      </nav>
    </header>
  );
};
