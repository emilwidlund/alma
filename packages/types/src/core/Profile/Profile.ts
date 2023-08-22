import { z } from 'zod';

export const ProfileSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});

export const OwnerSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url().optional()
});
