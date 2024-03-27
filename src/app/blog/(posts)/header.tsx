'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useRef } from 'react';
import TimeAgo from 'javascript-time-ago';

import type { PostData } from '@/lib/posts';

import en from 'javascript-time-ago/locale/en';
import { createView } from '../serverActions';

TimeAgo.addDefaultLocale(en);

const Header = ({ posts }: { posts: PostData[] }) => {
  const segments = useSelectedLayoutSegments();
  // segments can be:
  // date/post
  // lang/date/post
  const post = posts.find(
    (post) => post.slug === segments[segments.length - 1]
  );

  const timeAgo = new TimeAgo('en-US');

  if (post == null) return <></>;

  return (
    <>
      <h1 className='mb-1 text-2xl font-bold dark:text-gray-100'>
        {post.title}
      </h1>

      <p className='mt-2 flex text-xs text-gray-500 dark:text-gray-500'>
        <span className='flex-grow'>
          <span className='hidden md:inline'>
            <span>Marco Whyte</span>

            <span className='mx-2'>|</span>
          </span>

          {/* since we will pre-render the relative time, over time it
           * will diverge with what the user relative time is, so we suppress the warning.
           * In practice this is not an issue because we revalidate the entire page over time
           * and because we will move this to a server component with template.tsx at some point */}
          <span suppressHydrationWarning={true}>
            {post.date} ({timeAgo.format(new Date(post.date))})
          </span>
        </span>

        <span className='pr-1.5'>
          <Views slug={post.slug} defaultValue={post.views} />
        </span>
      </p>
    </>
  );
};

export default Header;

const Views = ({
  slug,
  defaultValue,
}: {
  slug: string;
  defaultValue: number;
}) => {
  const views = defaultValue;
  const didLogViewRef = useRef(false);

  useEffect(() => {
    if (!didLogViewRef.current) {
      createView(slug);
      didLogViewRef.current = true;
    }
  });

  return <>{views != null ? <span>{views} views</span> : null}</>;
};
