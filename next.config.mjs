import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      // Adds support for GitHub Flavored Markdown
      remarkGfm,
      // generates a table of contents based on headings
      remarkToc,
    ],
    rehypePlugins: [rehypeSlug, rehypeAccessibleEmojis, rehypeAutolinkHeadings],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
