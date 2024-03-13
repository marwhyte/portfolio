// Assuming the top of the file indicates this is server-side code
'use server';

// Import necessary utilities and configurations
import redis from '@/app/redis'; // Adjust this import path as necessary
import { revalidateTag } from 'next/cache';

// This function increments the view count for a given post
export async function createView(postSlug: string): Promise<void> {
  // Increment the view count in Redis using the post's slug
  await redis.incr(`post_views:${postSlug}`);
  // Revalidate the post cache, if you're using ISR or similar caching strategies
  revalidateTag('posts');
}
