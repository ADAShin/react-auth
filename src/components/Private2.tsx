import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchUsers } from '../service/api/jsonPlaceholder';

const Private2: FC = () => {
  const { data: users, isError } = useQuery({
    queryKey: ['jsonplaceholder-users'],
    queryFn: fetchUsers,
    retry: 1,
    cacheTime: 0,
    staleTime: 0,
  });

  if (isError) {
    return <h3>Error</h3>;
  }
  return (
    <>
      <Helmet>
        <title>Sample | Private Route 2</title>
      </Helmet>
      <h3 className="container mt-5 text-center">Private Route 2</h3>
      <div className="mt-3 text-center">
        <ul>
          {users &&
            users.map((user) => (
              <li key={user.id}>
                {`${user.id}: ${user.username}:(${user.email})`}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Private2;
