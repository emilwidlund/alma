import { z } from 'zod';

export const ConnectionSchema = z.object({
    id: z.string(),
    from: z.string(),
    to: z.string()
});
