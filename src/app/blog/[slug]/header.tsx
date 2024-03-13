import { Card } from '@/app/components/card';
import { formatDate } from '@/app/utils';
import { PostData } from '@/lib/posts';
import { H1 } from './components/h1';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Views from './views';

const Header = ({ post }: { post: PostData }) => {
  return (
    <div>
      <Link
        className='absolute mb-16 flex translate-y-[-60px] items-center gap-1 text-sm text-gray-500 hover:!text-teal-500 dark:text-gray-300 lg:translate-x-[-200px]'
        href='/blog'
      >
        <ChevronLeftIcon className='bold h-4 w-4 ' />
        Go Back
      </Link>
      <div>
        <Card.Eyebrow>{formatDate(post.date)}</Card.Eyebrow>
      </div>
      <H1>{post.title}</H1>
      <div className='mt-4 flex items-center justify-between text-xs'>
        <Card.Category>{post.category}</Card.Category>
        <Views post={post} />
      </div>
    </div>
  );
};

export default Header;
