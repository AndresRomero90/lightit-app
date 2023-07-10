import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../shared/components/Button';
import DatePicker from '../../shared/components/DatePicker';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import { AuthApi } from '../api/auth.api';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../shared/interfaces/ErrorResponse';
import { Link, useNavigate } from 'react-router-dom';
import {
  DIAGNOSIS_ROUTE,
  LOGIN_ROUTE,
} from '../../shared/components/NavigationRouter';

type Gender = {
  value: 'male' | 'female';
  label: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    validateOnChange: true,
    initialValues: {
      firstName: '',
      lastName: '',
      gender: {
        label: 'Male',
        value: 'male',
      },
      dateOfBirth: new Date(),
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      gender: Yup.object<Gender>().required('Required'),
      dateOfBirth: Yup.date().required('Required'),
      email: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Required'),
    }),
    onSubmit: async (
      values: {
        firstName: string;
        lastName: string;
        gender?: Gender;
        email: string;
        password: string;
        confirmPassword: string;
        dateOfBirth: Date;
      },
      { setSubmitting, resetForm }
    ) => {
      setSubmitting(true);

      try {
        const response = await AuthApi.getInstance().register(
          values.firstName,
          values.lastName,
          values.gender?.value ?? 'male',
          values.dateOfBirth,
          values.email,
          values.password
        );
        if (response?.status === 201) {
          setSubmitting(false);
          resetForm();
          localStorage.setItem('token', response.data.token);
          navigate(DIAGNOSIS_ROUTE, { replace: true });
        } else {
          setSubmitting(false);
          console.error(response);
        }
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        setSubmitting(false);
        console.error(err.response?.data.message);
      }
    },
  });

  return (
    <main className='bg-blue-300 min-w-full min-h-screen p-10'>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='bg-slate-100 px-5 py-10 rounded-lg shadow-lg w-6/12 flex flex-col'>
          <h1 className='text-slate-950 font-bold text-2xl mb-10 self-center'>
            Let's create an account!
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              label='First Name'
              type='text'
              name='firstName'
              required
              onChange={handleChange}
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
            />
            <Input
              label='Last Name'
              type='text'
              name='lastName'
              required
              onChange={handleChange}
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
            />
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
            <Input
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              required
              onChange={handleChange}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <div className='grid grid-cols-2 gap-2'>
              <Select
                label='Gender'
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                onChange={(selectedOption) => {
                  setFieldValue('gender', selectedOption)
                    .then(() => {
                      /* Value set */
                    })
                    .catch(console.error);
                }}
                values={values.gender}
                name='gender'
                error={errors.gender}
                touched={touched.gender}
                required
              />

              <DatePicker
                label='Date of Birth'
                name='dateOfBirth'
                error={errors.dateOfBirth as string}
                touched={touched.dateOfBirth as boolean}
                onChange={(date) => {
                  setFieldValue('dateOfBirth', date)
                    .then(() => {
                      /* Value set */
                    })
                    .catch(console.error);
                }}
                value={values.dateOfBirth}
              />
            </div>
            <Button
              label='Register'
              type='submit'
              className='w-full mt-10'
              disabled={isSubmitting}
            />
          </form>
          <hr className='my-8 border-t border-slate-300' />
          <Link
            to={LOGIN_ROUTE}
            replace
            className='text-slate-600 self-center italic hover:text-slate-950 hover:cursor-pointer'>
            Do you have an account? Log in!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
