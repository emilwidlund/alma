import { z } from 'zod';

export const ArtboardSchema = z.object({
    id: z.string(),
    size: z.object({
        width: z.number(),
        height: z.number()
    })
});
