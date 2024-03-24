import { ReactNode } from 'react';

export const P = ({ children }: { children?: ReactNode }) => {
  return <p className='my-5 [blockquote_&]:my-2'>{children}</p>;
};
