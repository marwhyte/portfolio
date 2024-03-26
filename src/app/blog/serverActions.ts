'use server';

import { Redis } from '@upstash/redis';

import { revalidateTag } from 'next/cache';

// This function increments the view count for a given post
export async function createView(postSlug: string): Promise<void> {
  const redis = Redis.fromEnv();

  // Increment the view count in Redis using the post's slug
  await redis.incr(`post_views:${postSlug}`);
  // Revalidate the post cache, if you're using ISR or similar caching strategies
  revalidateTag('posts');
}
