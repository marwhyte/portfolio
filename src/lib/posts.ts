import { readdir } from 'fs/promises';

export interface PostData {
  category: string;
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

  // Retrieve metadata from MDX files
  const posts: PostData[] = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`../app/blog/(posts)/${name}/page.mdx`);
      return { slug: name, views: 0, ...metadata };
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
