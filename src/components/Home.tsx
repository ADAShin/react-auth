import { FC, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthValue, setAuth } from '../redux/auth/authSlice';

type UserInfo = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(getAuthValue);
  const [message, setMessage] = useState('You are not authenticated');

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get<UserInfo>('user');
        const user = res.data;
        setMessage(`Hi ${user.first_name} ${user.last_name}`);
        dispatch(setAuth(true));
      } catch (e) {
        dispatch(setAuth(false));
      }
    };
    void userInfo();
  }, [dispatch]);

  return (
    <h3 className="container mt-5 text-center">
      {auth ? message : 'You are not authenticated'}
    </h3>
  );
};

export default Home;
