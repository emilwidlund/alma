import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url(),
    location: z.string(),
    website: z.string().url()
});

export const AuthorSchema = z.object({
    id: z.string(),
    username: z.string(),
    image: z.string().url()
});
