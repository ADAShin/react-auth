import type { FC, SyntheticEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginData } from './Login';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { setAuth } from '../../redux/auth/authSlice';
import qrcode from 'qrcode';

type Props = {
  loginData: LoginData;
};

const AuthenticatorForm: FC<Props> = ({
  loginData: { id, secret, otpauth_url },
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    try {
      const { data } = await axios.post<{ token: string }>('two-factor', {
        id,
        secret,
        code,
      });
      // アクセストークンBearerトークンとしてAuthorizationヘッダーに追加
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      dispatch(setAuth(true));
      navigate('/');
    } catch (e) {
      alert(e);
    }
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
