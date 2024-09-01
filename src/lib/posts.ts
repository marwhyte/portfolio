import { readdir } from 'fs/promises';
import { Category } from './categories';
import { Redis } from '@upstash/redis';
import path from 'path';

export interface PostData {
  category: Category;
  countryCodes?: string[];
  date: string;
  images: string[];
  slug: string;
  title: string;
  views: number;
}

export async function getPosts(): Promise<PostData[]> {
  const redis = Redis.fromEnv();

  const postsDirectory = path.join(process.cwd(), 'src/app/blog/(posts)');
  const slugs = (await readdir(postsDirectory, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const redisKeys = slugs.map((name) => `post_views:${name}`);

  const viewCounts: string[] = await redis.mget(redisKeys);

  // Retrieve metadata from MDX files
  const posts: PostData[] = await Promise.all(
    slugs.map(async (name, index) => {
      const viewCount = parseInt(viewCounts[index]) || 0;

      const { metadata } = await import(`../app/blog/(posts)/${name}/page.mdx`);
      return {
        slug: name,
        views: viewCount,
        countryCodes:
          metadata.countryCodes ??
          (metadata.countryCode ? [metadata.countryCode] : []),
        ...metadata,
      };
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
