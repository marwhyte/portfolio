import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';
import Header from './header';
import { getPosts } from '@/lib/posts';
import Gallery from './gallery';

export default async function PostsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const posts = await getPosts();

  return (
    <div className='mx-auto mt-16 max-w-2xl px-2 lg:px-8'>
      <Header posts={posts} />
      <Link
        className='absolute z-120 mb-16 flex translate-y-[-163px] items-center gap-1 text-sm text-gray-500 hover:!text-teal-500 dark:text-gray-300 lg:translate-x-[-200px]'
        href='/blog'
      >
        <ChevronLeftIcon className='bold h-4 w-4 ' />
        Go Back
      </Link>
      {children}
      <Gallery posts={posts} />
    </div>
  );
}
