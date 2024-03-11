import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface PostData {
  content: string;
  date: string;
  slug: string;
  title: string;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

// `cache` is a React 18 feature that lets you cache a function for the lifetime of a request.
// This is useful if you want to avoid fetching the same data over and over again.
export const getPosts = cache(() => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    // get the slug from the file name by removing the .md
    const slug = fileName.replace(/\.md$/, '');

    // Read .md file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the post metadata with gray-matter
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      content: matterResult.content,
      date: matterResult.data.date,
      title: matterResult.data.title,
      ...matterResult.data,
    };
  });
  // Sort posts by date in typescript
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
});

export const getPostBySlug = async (slug: string) => {
  const allPosts = await getPosts();

  return allPosts.find((post) => post.slug === slug);
};
