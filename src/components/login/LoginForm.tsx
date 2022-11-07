import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { LoginData } from './Login';

type LoginFormResponse = LoginData;

type LoginFormBody = {
  email: string;
  password: string;
};

type Props = {
  loginData: (data: LoginFormResponse) => void;
};

const LoginForm: FC<Props> = ({ loginData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<
        LoginFormResponse,
        AxiosResponse<LoginFormResponse, any>,
        LoginFormBody
      >('login', {
        email,
        password,
      });
      loginData(data);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="mb-3">
        <Link to="/forgot">Forgot Password</Link>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
