import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthValue, setAuth } from '../redux/auth/authSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthUser } from '../service/api/auth';

const Home: FC = () => {
  console.log('Home');
  const auth = useAppSelector(getAuthValue);
  const dispatch = useAppDispatch();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth-user'],
    queryFn: fetchAuthUser,
    retry: 1,
    onSuccess: () => {
      dispatch(setAuth(true));
    },
    onError: () => {
      dispatch(setAuth(false));
    },
    //enabled: auth,
    suspense: false,
  });

  if (isLoading) {
    return <h3 className="container mt-5 text-center">Loading...</h3>;
  }

  if (isError) {
    console.log('error');
    return (
      <h3 className="container mt-5 text-center">You are not authenticated</h3>
    );
  }

  return (
    <h3 className="container mt-5 text-center">
      {auth
        ? `Hi ${user?.first_name} ${user?.last_name}`
        : 'You are not authenticated'}
    </h3>
  );
};

export default Home;
