import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthValue, setAuth } from '../redux/auth/authSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthUser } from '../service/api/auth';
import { Helmet } from 'react-helmet-async';

const Home: FC = () => {
  const auth = useAppSelector(getAuthValue);
  const dispatch = useAppDispatch();

  const { data: user } = useQuery({
    queryKey: ['auth-user'],
    queryFn: fetchAuthUser,
    retry: 1,
    retryDelay: 200,
    onSuccess: () => {
      dispatch(setAuth(true));
    },
    onError: () => {
      console.log('HomeでuseQueryのエラー');
    },
    suspense: true,
    enabled: auth,
  });

  return (
    <>
      <Helmet>
        <title>Sample | Home</title>
      </Helmet>
      <h3 className="container mt-5 text-center">
        {auth
          ? `Hi ${user?.first_name} ${user?.last_name}`
          : 'You are not authenticated'}
      </h3>
    </>
  );
};

export default Home;
