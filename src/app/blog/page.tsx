import { getPosts } from '@/lib/posts';

export default function Blog() {
  const posts = getPosts();

  return (
    <ul>
      {posts.map(({ date, slug, title }) => (
        <li key={slug}>
          <a href={`/blog/${slug}`}>
            {title}
            <br />
            {date}
          </a>
        </li>
      ))}
    </ul>
  );
}
