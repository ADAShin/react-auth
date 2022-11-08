import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../service/api/register';
import type { RegistFormBody } from '../service/api/type';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: '必須入力です' })
      .max(128, { message: '128文字以下で入力してください' }),
    lastName: z
      .string()
      .min(1, { message: '必須入力です' })
      .max(128, { message: '128文字以下で入力してください' }),
    email: z
      .string()
      .min(1, { message: '必須入力です' })
      .email({ message: '不正な値です' }),
    password: z.string().min(1, { message: '必須入力です' }),
    passwordConfirm: z.string().min(1, { message: '必須入力です' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirm'],
  });

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });
  const navigate = useNavigate();
  const registerMutate = useMutation({
    mutationFn: (val: RegistFormBody) => registerUser(val),
    onSuccess: () => navigate('/login'),
    onError: (err) => alert(err),
  });

  const onSubmit: SubmitHandler<RegisterFormSchema> = (data) => {
    const {
      firstName: first_name,
      lastName: last_name,
      passwordConfirm: password_confirm,
      ...rest
    } = data;
    registerMutate.mutate({
      first_name,
      last_name,
      password_confirm,
      ...rest,
    });
  };

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <div className="form-floating mb-2">
          <input
            type="text"
            className={
              errors.firstName ? 'form-control is-invalid' : 'form-control'
            }
            id="floatingFirstName"
            placeholder="First Name"
            {...register('firstName')}
          />
          <label htmlFor="floatingFirstName">First Name</label>
          {errors.firstName?.message && (
            <div className="invalid-feedback">{errors.firstName.message}</div>
          )}
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className={
              errors.lastName ? 'form-control is-invalid' : 'form-control'
            }
            id="floatingLastName"
            placeholder="Last Name"
            {...register('lastName')}
          />
          <label htmlFor="floatingFirstName">Last Name</label>
          {errors.lastName?.message && (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          )}
        </div>

        <div className="form-floating mb-2">
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

        <div className="form-floating mb-2">
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
  );
};

export default Register;
