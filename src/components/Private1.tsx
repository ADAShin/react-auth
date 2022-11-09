import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchTodos } from '../service/api/jsonPlaceholder';

const Private1: FC = () => {
  const { data: todos, isError } = useQuery({
    queryKey: ['jsonplaceholder-todos'],
    queryFn: fetchTodos,
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
        <title>Sample | Private Route 1</title>
      </Helmet>
      <h3 className="container mt-5 text-center">Private Route 1</h3>

      <div className="mt-3 text-center">
        <ul>
          {todos &&
            todos.map((todo) => (
              <li key={todo.id}>
                {`${todo.userId}-${todo.id} : ${todo.title} is `}
                {todo.completed ? '✅' : ''}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Private1;
