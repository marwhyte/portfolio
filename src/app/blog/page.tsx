import { PostData, getPosts } from '@/lib/posts';
import { Suspense, useState } from 'react';
import useSWR from 'swr';
import { Card } from '../components/card';

type SortBy = 'date' | 'title' | 'views';

type SortType = [SortBy, 'desc' | 'asc'];

const Post = ({ post }: { post: PostData }) => {
  const views = post.views;
  const dateObject = new Date(post.date);

  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  console.log(formattedDate);

  return (
    <>
      <div className='absolute -left-1.5 top-2 flex h-3 w-3 items-center justify-center rounded-full border-2 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800' />
      <article className='md:grid md:grid-cols-4 md:items-baseline'>
        <Card className='md:col-span-3'>
          <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
          <Card.Eyebrow
            as='time'
            dateTime={post.date}
            className='md:hidden'
            decorate
          >
            {formattedDate}
          </Card.Eyebrow>
          <Card.Cta>Read post</Card.Cta>
        </Card>
        <Card.Eyebrow
          as='time'
          dateTime={post.date}
          className='hidden md:block'
        >
          {formattedDate}
        </Card.Eyebrow>
      </article>
    </>
  );
};

const Posts = ({ posts }: { posts: PostData[] }) => {
  return (
    <ul className='flex max-w-3xl flex-col space-y-16 md:border-l md:border-zinc-300 md:pl-6 md:dark:border-zinc-100/40'>
      {posts.map((post) => (
        <>
          <li className='relative' key={post.slug}>
            <Post post={post} />
          </li>
        </>
      ))}
    </ul>
  );
};

export default function Blog() {
  const posts: PostData[] = getPosts();

  return <Posts posts={posts} />;
}
