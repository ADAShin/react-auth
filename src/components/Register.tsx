import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type RegistFormResponse = {
  message: string;
};

type RegistFormBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const Register: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post<RegistFormResponse, any, RegistFormBody>('register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm,
      });
      navigate('/login');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingFirstName"
            placeholder="もとはる"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="floatingFirstName">First Name</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            placeholder="さの"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="floatingFirstName">Last Name</label>
        </div>

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

export default Register;
