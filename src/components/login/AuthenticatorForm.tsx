import type { FC, SyntheticEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setAuth } from '../../redux/auth/authSlice';
import qrcode from 'qrcode';
import { useMutation } from '@tanstack/react-query';
import type { LoginData, TwoFactorAuthBody } from '../../service/api/type';
import { twoFactorAuth } from '../../service/api/auth';
import apiClient from '../../service/api/apiClient';

type Props = {
  loginData: LoginData;
};

const AuthenticatorForm: FC<Props> = ({
  loginData: { id, secret, otpauth_url },
}) => {
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
  const [code, setCode] = useState('');
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

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    twoFactorAuthMutate.mutate({ id, secret, code });
  };

  return (
    <>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">
          Please insert your authenticator code
        </h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setCode(e.target.value)}
          />
          <label htmlFor="floatingInput">6 digit code</label>
        </div>

        <button className="mt-3 w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
      {img}
    </>
  );
};

export default AuthenticatorForm;
