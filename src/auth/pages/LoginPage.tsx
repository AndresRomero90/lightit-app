import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import { AuthApi } from '../api/auth.api';
import { AxiosError } from 'axios';
import { LoginErrorResponse } from '../interfaces/LoginErrorResponse';
import { Link, useNavigate } from 'react-router-dom';
import {
  DIAGNOSIS_ROUTE,
  REGISTER_ROUTE,
} from '../../shared/components/NavigationRouter';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, touched, errors, isSubmitting } =
    useFormik({
      validateOnChange: true,
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      }),
      onSubmit: async (
        values: {
          email: string;
          password: string;
        },
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);

        try {
          const response = await AuthApi.getInstance().login(
            values.email,
            values.password
          );
          if (response?.status === 200) {
            setSubmitting(false);
            resetForm();
            localStorage.setItem('token', response.data.token);
            navigate(DIAGNOSIS_ROUTE, { replace: true });
          } else {
            setSubmitting(false);
            console.error(response);
          }
        } catch (error) {
          const err = error as AxiosError<LoginErrorResponse>;
          setSubmitting(false);
          console.error(err.response?.data.error);
        }
      },
    });

  return (
    <main className='bg-blue-300 min-w-full min-h-screen p-10'>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='bg-slate-100 px-5 py-10 rounded-lg shadow-lg w-6/12 flex flex-col'>
          <h1 className='text-slate-950 font-bold text-2xl mb-10 self-center'>
            Welcome!
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              label='Email'
              type='email'
              name='email'
              required
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <Input
              label='Password'
              type='password'
              name='password'
              required
              onChange={handleChange}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />

            <Button
              label='Login'
              type='submit'
              className='w-full mt-10'
              disabled={isSubmitting}
            />
          </form>
          <hr className='my-8 border-t border-slate-300' />
          <Link
            to={REGISTER_ROUTE}
            replace
            className='text-slate-600 self-center italic hover:text-slate-950 hover:cursor-pointer'>
            Do you need an account? Let's create it!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
