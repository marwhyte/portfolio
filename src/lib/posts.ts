import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import redis from '@/app/redis';

export interface PostData {
  category: string;
  content: string;
  date: string;
  slug: string;
  title: string;
  views: number;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

export const getPosts = async () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const slugs = fileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
  const redisKeys = slugs.map((slug) => `post_views:${slug}`);
  const viewsArray: string[] = await redis.mget(...redisKeys);

  const allPostsData = fileNames.map((fileName, index) => {
    const slug = slugs[index];
    const viewCount = parseInt(viewsArray[index], 10) || 0;

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      category: matterResult.data.category,
      content: matterResult.content,
      date: matterResult.data.date,
      title: matterResult.data.title,
      views: viewCount,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostBySlug = async (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const viewCountKey = `post_views:${slug}`;
  const rawViewCount: string | null = await redis.get(viewCountKey);
  const viewCount = parseInt(rawViewCount ?? '0', 10);

  return {
    slug,
    category: matterResult.data.category,
    content: matterResult.content,
    date: matterResult.data.date,
    title: matterResult.data.title,
    views: viewCount,
    ...matterResult.data,
  };
};
