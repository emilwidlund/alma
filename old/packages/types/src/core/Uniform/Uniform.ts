import { z } from 'zod';

export const UniformTypeSchema = z.enum(['TEXTURE']);

export const UniformSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: UniformTypeSchema,
    value: z.string()
});
