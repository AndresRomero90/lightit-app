import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../../auth/components/PrivateRoute';
const TestPage = lazy(() => import('../pages/TestPage'));
const LoginPage = lazy(() => import('../../auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../../auth/pages/RegisterPage'));

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const DIAGNOSIS_ROUTE = '/diagnosis';

export const NavigationRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={DIAGNOSIS_ROUTE} element={<TestPage />} />
        </Route>
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />

        <Route path='/' element={<Navigate to={LOGIN_ROUTE} />} />
        <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
