import { ReactNode } from 'react';
import { withHeadingId } from './utils';

export const H1 = ({ children }: { children?: ReactNode }) => {
  return (
    <h1 className='mb-1 text-2xl font-bold dark:text-gray-100'>
      {withHeadingId(children)}
    </h1>
  );
};
