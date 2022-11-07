import axios from 'axios';
import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reset: FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  console.log(token);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post<
        any,
        any,
        { password: string; password_confirm: string; token?: string }
      >('reset', {
        password,
        password_confirm: passwordConfirm,
        token,
      });
      navigate('/login');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Reset your password</h1>

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
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPasswordConfirm"
            placeholder="Password Confirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label htmlFor="floatingPasswordConfirm">Password Confirm</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Reset;
