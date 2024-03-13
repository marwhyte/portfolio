import { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className='mx-auto mt-16 max-w-2xl px-4 lg:px-8'>{children}</div>;
}
