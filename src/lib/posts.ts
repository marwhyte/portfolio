import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostData {
  date: string;
  id: string;
  title: string;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    // get the id from the file name by removing the .md
    const id = fileName.replace(/\.md$/, '');

    // Read .md file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the post metadata with gray-matter
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
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
}
