import { formatViews } from '@/app/utils';
import { PostData } from '@/lib/posts';

const Views = ({ post }: { post: PostData }) => {
  return (
    <span className='relative z-10 text-xs !text-gray-400 dark:!text-gray-400'>
      {formatViews(post.views)}
    </span>
  );
};

export default Views;
