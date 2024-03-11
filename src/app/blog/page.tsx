import { getPosts } from '@/lib/posts';

export default function Blog() {
  const posts = getPosts();
  return (
    <ul>
      {posts.map(({ date, id, title }) => (
        <li key={id}>
          {title}
          <br />
          {date}
        </li>
      ))}
    </ul>
  );
}
