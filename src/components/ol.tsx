import { ReactNode } from 'react';

export const OL = ({ children }: { children?: ReactNode }) => {
  return <ol className='my-5 list-inside list-decimal'>{children}</ol>;
};
