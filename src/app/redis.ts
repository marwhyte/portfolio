import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing env var UPSTASH_REDIS_REST_TOKEN');
}

const redis = new Redis({
  url: 'https://us1-modern-piranha-42035.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
