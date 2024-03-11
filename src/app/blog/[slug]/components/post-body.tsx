import { MDXRemote } from 'next-mdx-remote/rsc';

export function PostBody({ children }: { children: string }) {
  return <MDXRemote source={children} />;
}
