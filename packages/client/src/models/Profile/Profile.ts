import { z } from 'zod';

export const ProfileSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url(),
    bio: z.string(),
    location: z.string(),
    website: z.string().url(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});

export const OwnerSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url()
});
