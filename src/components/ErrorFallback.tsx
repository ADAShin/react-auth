import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import ApiAuthError from '../errors/ApiAuthError';
import { setAuth } from '../redux/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';

const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  const dispatch = useAppDispatch();
  if (error instanceof ApiAuthError) {
    dispatch(setAuth(false));
    return <Navigate to="/login" />;
  }
  return <h3 className="container mt-5 text-center">Error</h3>;
};

export default ErrorFallback;
