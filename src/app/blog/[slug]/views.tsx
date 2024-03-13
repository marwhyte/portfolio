'use client';

import { formatViews } from '@/app/utils';
import { PostData } from '@/lib/posts';
import { useEffect } from 'react';
import { createView } from '../serverActions';

const Views = ({ post }: { post: PostData }) => {
  useEffect(() => {
    createView(post.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className='relative z-10 text-xs !text-gray-400 dark:!text-gray-400'>
      {formatViews(post.views)}
    </span>
  );
};

export default Views;
