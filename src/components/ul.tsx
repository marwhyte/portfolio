import { ReactNode } from 'react';

export const UL = ({ children }: { children?: ReactNode }) => {
  return <ul className='my-5 list-inside list-none'>{children}</ul>;
};
