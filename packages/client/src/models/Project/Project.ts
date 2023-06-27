import { LayerSchema } from '@usealma/types';
import { z } from 'zod';

import { AuthorSchema } from '../User/User';

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    layers: z.array(LayerSchema),
    author: AuthorSchema,
    createdAt: z.date(),
    updatedAt: z.date()
});
