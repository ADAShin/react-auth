import type { FC } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { LoginData } from '../../service/api/type';
import AuthenticatorForm from './AuthenticatorForm';
import LoginForm from './LoginForm';

const Login: FC = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  return (
    <>
      <Helmet>
        <title>Sample | Login</title>
      </Helmet>
      <main className="form-signin">
        {loginData === null ? (
          <LoginForm loginData={setLoginData} />
        ) : (
          <AuthenticatorForm loginData={loginData} />
        )}
      </main>
    </>
  );
};

export default Login;
