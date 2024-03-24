import { ReactNode } from 'react';
import { withHeadingId } from './utils';

export const H3 = ({ children }: { children?: ReactNode }) => {
  return (
    <h3 className='group relative my-8 text-lg font-bold'>
      {withHeadingId(children)}
    </h3>
  );
};
