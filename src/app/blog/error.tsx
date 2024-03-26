'use client';

const ErrorBoundary = ({ error }: { error: Error }) => {
  return <h1>{error.message}</h1>;
};

export default ErrorBoundary;
