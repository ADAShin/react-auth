import type { FC } from 'react';
import { useState } from 'react';
import AuthenticatorForm from './AuthenticatorForm';
import LoginForm from './LoginForm';

export type LoginData = {
  id: number;
  secret?: string;
  otpauth_url?: string;
};

const Login: FC = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  return (
    <main className="form-signin">
      {loginData === null ? (
        <LoginForm loginData={setLoginData} />
      ) : (
        <AuthenticatorForm loginData={loginData} />
      )}
    </main>
  );
};

export default Login;
