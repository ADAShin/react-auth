import type { FC } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Forgot from './components/Forgot';
import Home from './components/Home';
import Login from './components/login/Login';
import NotFoundPage from './components/NotFoundPage';
import Private1 from './components/Private1';
import Private2 from './components/Private2';
import Register from './components/Register';
import Reset from './components/Reset';
import { getAuthValue } from './redux/auth/authSlice';
import { useAppSelector } from './redux/hooks';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/private1" element={<Private1 />} />
        <Route path="/private2" element={<Private2 />} />
      </Route>
      <Route element={<NotAuthenticateRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:token" element={<Reset />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const PrivateRoute = () => {
  const auth = useAppSelector(getAuthValue);
  if (auth) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

const NotAuthenticateRoute = () => {
  const auth = useAppSelector(getAuthValue);
  if (!auth) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default Router;
