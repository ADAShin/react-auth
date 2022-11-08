import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthValue, setAuth } from '../redux/auth/authSlice';
import { logout as apiLogout } from '../service/api/auth';

const Nav: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(getAuthValue);

  const logout = async () => {
    await apiLogout();
    dispatch(setAuth(false));
  };

  const links = auth ? (
    <div className="text-end">
      <Link to="/private1" className="btn btn-outline-light me-2">
        Private1
      </Link>
      <Link to="/private2" className="btn btn-outline-light me-2">
        Private2
      </Link>
      <button onClick={logout} className="btn btn-outline-light me-2">
        Logout
      </button>
    </div>
  ) : (
    <div className="text-end">
      <Link to="/login" className="btn btn-outline-light me-2">
        Login
      </Link>
      <Link to="/register" className="btn btn-outline-light me-2">
        Register
      </Link>
    </div>
  );

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
          </ul>
          {links}
        </div>
      </div>
    </header>
  );
};

export default Nav;
