import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../shared/components/NavigationRouter';

export const PrivateRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const token = localStorage.getItem('token');
  const isAuth = token !== null && token !== '';

  return !isAuth ? (
    <Navigate to={LOGIN_ROUTE} replace />
  ) : (
    <>{children ?? <Outlet />}</>
  );
};
