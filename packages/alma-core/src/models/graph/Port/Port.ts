import { z } from 'zod';

export const PortSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string()
});
