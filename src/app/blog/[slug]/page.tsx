import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { PostBody } from './components/post-body';

const PostPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getPostBySlug(params.slug);
  // notFound is a Next.js utility
  if (!post) return notFound();

  return <PostBody>{post.content}</PostBody>;
};

export default PostPage;
