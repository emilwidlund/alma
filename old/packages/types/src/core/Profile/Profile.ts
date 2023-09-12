import { z } from 'zod';

export const ProfileSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url().nullable(),
    bio: z.string().nullable(),
    location: z.string().nullable(),
    website: z.string().url().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});

export const OwnerSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url().nullable()
});
