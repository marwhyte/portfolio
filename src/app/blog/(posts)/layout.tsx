import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import NavigationEvents from './NavigationEvents';

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto mt-16 max-w-2xl px-4 lg:px-8'>
      <Link
        className='absolute mb-16 flex translate-y-[-60px] items-center gap-1 text-sm text-gray-500 hover:!text-teal-500 dark:text-gray-300 lg:translate-x-[-200px]'
        href='/blog'
      >
        <ChevronLeftIcon className='bold h-4 w-4 ' />
        Go Back
      </Link>
      {children}
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </div>
  );
}
