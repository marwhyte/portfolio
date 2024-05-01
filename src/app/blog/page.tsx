import { PostData, getPosts } from '@/lib/posts';
import Card from '../components/card';
import { formatDate, formatViews } from '../utils';
import { H1 } from '../../components/h1';
import { Suspense } from 'react';

const Post = ({ post }: { post: PostData }) => {
  return (
    <>
      <div className='h-3 absolute flex hidden w-3 -translate-x-[30.5px] translate-y-[7px] items-center justify-center rounded-full border border-gray-300 bg-white  dark:border-gray-400 dark:bg-gray-900 md:block' />
      <article className='md:grid md:grid-cols-4 md:items-baseline'>
        <Card className='md:col-span-3'>
          <div className='flex w-full justify-between'>
            <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
            <div className='-mt-9 md:-mt-1'>
              <Card.Category>{post.category}</Card.Category>
              <div className='mt-2 text-center'>
                <span className='relative z-10 text-xs !text-gray-400 dark:!text-gray-400'>
                  {formatViews(post.views)}
                </span>
              </div>
            </div>
          </div>
          <Card.Eyebrow as='time' dateTime={post.date} className='md:hidden'>
            {formatDate(post.date)}
          </Card.Eyebrow>
          <Card.Cta>Read post</Card.Cta>
        </Card>
        <Card.Eyebrow
          as='time'
          dateTime={post.date}
          className='hidden md:block'
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
      </article>
    </>
  );
};

const Posts = ({ posts }: { posts: PostData[] }) => {
  return (
    <ul className='flex flex-col space-y-12 md:space-y-16 md:border-l md:border-gray-300 md:pl-6 md:dark:border-gray-100/40'>
      {posts.map((post) => (
        <li className='relative' key={post.slug}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};

export default async function Blog() {
  const posts: PostData[] = await getPosts();

  return (
    <div className='mb-24'>
      <div className='mb-16 text-center'>
        <H1>My Blog</H1>
        <p className='text-md mt-2'>
          Learn more about my projects, work and personal life.
        </p>
      </div>
      <Suspense fallback={<div />}>
        <Posts posts={posts} />
      </Suspense>
    </div>
  );
}
