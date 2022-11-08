import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setAuth } from '../../redux/auth/authSlice';
import qrcode from 'qrcode';
import { useMutation } from '@tanstack/react-query';
import type { LoginData, TwoFactorAuthBody } from '../../service/api/type';
import { twoFactorAuth } from '../../service/api/auth';
import apiClient from '../../service/api/apiClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const tfaAuthSchema = z.object({
  code: z
    .string()
    .min(1, { message: '必須入力です' })
    .regex(/^\d{6}$/, { message: '6桁の数値を入力してください' }),
});

type TfaAuthSchema = z.infer<typeof tfaAuthSchema>;

type Props = {
  loginData: LoginData;
};

const AuthenticatorForm: FC<Props> = ({
  loginData: { id, secret, otpauth_url },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TfaAuthSchema>({
    resolver: zodResolver(tfaAuthSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const twoFactorAuthMutate = useMutation({
    mutationFn: (val: TwoFactorAuthBody) => twoFactorAuth(val),
    onSuccess: (token) => {
      // アクセストークンBearerトークンとしてAuthorizationヘッダーに追加
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(setAuth(true));
      navigate('/');
    },
    onError: (err) => {
      alert(err);
    },
  });

  const [img, setImg] = useState<ReactElement | null>(null);

  useEffect(() => {
    const createQR = async (otpauth_url: string) => {
      const data = await qrcode.toDataURL(otpauth_url);
      setImg(<img src={data} style={{ width: '100%' }} alt="qrcode" />);
    };
    if (otpauth_url) {
      void createQR(otpauth_url);
    }
  }, [otpauth_url]);

  const onSubmit: SubmitHandler<TfaAuthSchema> = (data) => {
    twoFactorAuthMutate.mutate({ id, secret, code: data.code });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">
          Please insert your authenticator code
        </h1>

        <div className="form-floating">
          <input
            type="text"
            className={errors.code ? 'form-control is-invalid' : 'form-control'}
            id="floatingInput"
            placeholder="name@example.com"
            {...register('code')}
          />
          <label htmlFor="floatingInput">6 digit code</label>
          {errors.code?.message && (
            <div className="invalid-feedback">{errors.code?.message}</div>
          )}
        </div>

        <button
          className="mt-3 w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign in
        </button>
      </form>
      {img}
    </>
  );
};

export default AuthenticatorForm;
