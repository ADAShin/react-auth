import type { FC } from 'react';
import { useState } from 'react';
import apiClient from '../service/api/apiClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';

const forgotFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: '必須入力です' })
    .email({ message: '不正な値です' }),
});

type ForgotFormSchema = z.infer<typeof forgotFormSchema>;

const Forgot: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ForgotFormSchema>({
    resolver: zodResolver(forgotFormSchema),
  });

  const [modify, setModify] = useState({
    show: false,
    error: false,
    message: '',
  });

  const onSubmit: SubmitHandler<ForgotFormSchema> = async ({ email }) => {
    try {
      await apiClient.post('forgot', { email });
      setModify({
        show: true,
        error: false,
        message: 'Please check your Email',
      });
    } catch (e) {
      setModify({ show: true, error: true, message: 'Error occurred!' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sample | Forgot Password</title>
      </Helmet>
      <main className="form-signin">
        {modify.show && (
          <div
            className={
              modify.error ? 'alert alert-danger' : 'alert alert-success'
            }
          >
            {modify.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="h3 mb-3 fw-normal">Please input your Email</h1>

          <div className="form-floating">
            <input
              type="email"
              className={
                errors.email ? 'form-control is-invalid' : 'form-control'
              }
              id="floatingInput"
              placeholder="name@example.com"
              {...register('email')}
            />
            <label htmlFor="floatingInput">Email address</label>
            {errors.email?.message && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <button
            className="mt-3 w-100 btn btn-lg btn-primary"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Forgot;
