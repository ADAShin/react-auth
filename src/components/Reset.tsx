import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { resetPassword } from '../service/api/auth';

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(1, { message: '必須入力です' }),
    passwordConfirm: z.string().min(1, { message: '必須入力です' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirm'],
  });

type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;

const Reset: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const { token = '' } = useParams();
  const navigate = useNavigate();

  console.log(token);

  const onSubmit: SubmitHandler<ResetPasswordFormSchema> = async (data) => {
    const { password, passwordConfirm: password_confirm } = data;
    try {
      await resetPassword({ password, password_confirm, token });
      navigate('/login');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sample | Reset Password</title>
      </Helmet>
      <main className="form-signin">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="h3 mb-3 fw-normal">Reset your password</h1>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={
                errors.password ? 'form-control is-invalid' : 'form-control'
              }
              id="floatingPassword"
              placeholder="Password"
              {...register('password')}
            />
            <label htmlFor="floatingPassword">Password</label>
            {errors.password?.message && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className={
                errors.passwordConfirm
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
              id="floatingPasswordConfirm"
              placeholder="Password Confirm"
              {...register('passwordConfirm')}
            />
            <label htmlFor="floatingPasswordConfirm">Password Confirm</label>
            {errors.passwordConfirm?.message && (
              <div className="invalid-feedback">
                {errors.passwordConfirm.message}
              </div>
            )}
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Reset;
