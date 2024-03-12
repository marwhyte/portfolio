import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostData {
  content: string;
  date: string;
  slug: string;
  title: string;
  views: number;
}

type ViewType = {
  [key: string]: string;
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

export const getPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const views: null | ViewType = null;

  const allPostsData: PostData[] = fileNames.map((fileName) => {
    // get the slug from the file name by removing the .md
    const slug = fileName.replace(/\.md$/, '');

    const postViews = Number(views?.[slug] ?? 0);

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
      views: postViews,
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
};

export const getPostBySlug = async (slug: string) => {
  const allPosts = await getPosts();

  return allPosts.find((post) => post.slug === slug);
};
