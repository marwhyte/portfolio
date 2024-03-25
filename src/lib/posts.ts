import { readdir } from 'fs/promises';
import { Category } from './categories';
import redis from '@/app/redis';

export interface PostData {
  category: Category;
  content: string;
  date: string;
  slug: string;
  title: string;
  views: number;
}

export async function getPosts(): Promise<PostData[]> {
  // Retrieve slugs from post routes
  const slugs = (
    await readdir('./src/app/blog/(posts)', { withFileTypes: true })
  ).filter((dirent) => dirent.isDirectory());

  // Initialize an array to hold the posts data
  const posts: PostData[] = [];

  for (const { name } of slugs) {
    try {
      // Attempt to retrieve the view count from Redis, defaulting to 0 on any error
      let viewCount = 0;
      try {
        const viewCountStr: string | null = await redis.get(
          `post_views:${name}`
        );

        viewCount = parseInt(viewCountStr ?? '0', 10) || 0;
      } catch (error) {
        console.error(`Error retrieving view count for post ${name}:`, error);
        // Optionally handle this error, e.g., by logging or sending an alert
      }

      // Retrieve metadata from the MDX files
      const { metadata } = await import(`../app/blog/(posts)/${name}/page.mdx`);

      // Add the post data to the array
      posts.push({ slug: name, views: viewCount, ...metadata });
    } catch (error) {
      console.error(`Error processing post ${name}:`, error);
      // Handle or log this error as needed
    }
  }

  // Sort posts from newest to oldest
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}

export const getPostBySlug = async (slug: string) => {
  const allPostsData = await getPosts();
  return allPostsData.find((post) => post.slug === slug);
};
