import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Forgot: FC = () => {
  const [email, setEmail] = useState('');
  const [modify, setModify] = useState({
    show: false,
    error: false,
    message: '',
  });
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('forgot', { email });
      setModify({
        show: true,
        error: false,
        message: 'Please check your Email',
      });
    } catch (e) {
      setModify({ show: true, error: true, message: 'Error occurred!' });
    }
  };

  return (
    <main className="form-signin">
      {modify.show && (
        <div
          className={
            modify.error ? 'alert alert-danger' : 'alert alert-success'
          }
        >
          {modify.message}
        </div>
      )}
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please input your Email</h1>

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

        <button className="mt-3 w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Forgot;
