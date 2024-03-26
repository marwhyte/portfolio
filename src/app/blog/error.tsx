'use client';

const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error);
  return <h1>{error.message}</h1>;
};

export default ErrorBoundary;
