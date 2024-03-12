import { getPosts } from '@/lib/posts';
import { NextApiRequest, NextApiResponse } from 'next';

// This is an API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log('Handling GET request');
    const posts = await getPosts();
    res.status(200).json(posts);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
