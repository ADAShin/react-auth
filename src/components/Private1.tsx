import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Private1: FC = () => {
  return (
    <>
      <Helmet>
        <title>Sample | Private Route 1</title>
      </Helmet>
      <h3 className="container mt-5 text-center">Private Route 1</h3>
    </>
  );
};

export default Private1;
