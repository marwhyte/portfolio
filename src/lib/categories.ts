export const categories = ['Travel', 'Tech'] as const;

export type Category = (typeof categories)[number];
