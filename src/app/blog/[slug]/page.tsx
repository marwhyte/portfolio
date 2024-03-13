import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { PostBody } from './components/post-body';
import Header from './header';

const PostPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <article className='mx-auto max-w-2xl'>
      <Header post={post} />
      <PostBody>{post.content}</PostBody>
    </article>
  );
};

export default PostPage;
