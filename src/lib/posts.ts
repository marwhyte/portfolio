import { readdir } from 'fs/promises';
import { Category } from './categories';
import { Redis } from '@upstash/redis';

export interface PostData {
  category: Category;
  content: string;
  date: string;
  slug: string;
  slugs: { name: string }[];
  title: string;
  views: number;
}

export async function getPosts(): Promise<PostData[]> {
  'use server';

  const redis = Redis.fromEnv();

  const slugs = (
    await readdir('./src/app/blog/(posts)', { withFileTypes: true })
  ).filter((dirent) => dirent.isDirectory());

  const redisKeys = slugs.map(({ name }) => `post_views:${name}`);
  const viewCounts: string[] = await redis.mget(redisKeys);

  // Retrieve metadata from MDX files
  const posts: PostData[] = await Promise.all(
    slugs.map(async ({ name }, index) => {
      const viewCount = parseInt(viewCounts[index]) || 0;

      const { metadata } = await import(`../app/blog/(posts)/${name}/page.mdx`);
      return { slug: name, slugs: slugs, views: viewCount, ...metadata };
    })
  );

  // Sort posts from newest to oldest
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}

export const getPostBySlug = async (slug: string) => {
  const allPostsData = await getPosts();
  return allPostsData.find((post) => post.slug === slug);
};
