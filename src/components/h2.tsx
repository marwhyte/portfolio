import { ReactNode } from 'react';
import { withHeadingId } from './utils';

export const H2 = ({ children }: { children?: ReactNode }) => {
  return (
    <h2 className='group relative my-8 text-xl font-bold'>
      {withHeadingId(children)}
    </h2>
  );
};
