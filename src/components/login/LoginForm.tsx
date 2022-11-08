import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { LoginData, LoginFormBody } from '../../service/api/type';
import { login } from '../../service/api/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: '必須入力です' })
    .email({ message: '不正な値です' }),
  password: z.string().min(1, { message: '必須入力です' }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

type Props = {
  loginData: (data: LoginData) => void;
};

const LoginForm: FC<Props> = ({ loginData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  const loginMutation = useMutation({
    mutationFn: (val: LoginFormBody) => login(val),
    onSuccess: (data) => {
      loginData(data);
    },
    onError: (err) => {
      alert(err);
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating mb-3">
        <input
          type="text"
          className={errors.email ? 'form-control is-invalid' : 'form-control'}
          id="floatingInput"
          placeholder="name@example.com"
          {...register('email')}
        />
        <label htmlFor="floatingInput">Email address</label>
        {errors.email?.message && (
          <div className="invalid-feedback">{errors.email?.message}</div>
        )}
      </div>
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

      <div className="mb-3">
        <Link to="/forgot">Forgot Password</Link>
      </div>

      <button
        className="w-100 btn btn-lg btn-primary"
        type="submit"
        disabled={!isDirty || !isValid}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
