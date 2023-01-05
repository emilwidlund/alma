import { z } from 'zod';

import { RGBASchema } from '../Color/Color';

export const ArtboardSchema = z.object({
    id: z.string(),
    size: z.object({
        width: z.number(),
        height: z.number()
    }),
    backgroundColor: RGBASchema
});
