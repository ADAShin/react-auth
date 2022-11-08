import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Private2: FC = () => {
  return (
    <>
      <Helmet>
        <title>Sample | Private Route 2</title>
      </Helmet>
      <h3 className="container mt-5 text-center">Private Route 2</h3>
    </>
  );
};

export default Private2;
