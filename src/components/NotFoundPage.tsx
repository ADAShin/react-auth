import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Sample | 404 Not Found</title>
      </Helmet>
      <main>
        <h3 className="container mt-5 text-center">Not Found</h3>
      </main>
    </>
  );
};

export default NotFoundPage;
