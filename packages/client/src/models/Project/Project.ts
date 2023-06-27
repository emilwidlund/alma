import { LayerSchema } from '@usealma/types';
import { z } from 'zod';

import { OwnerSchema } from '../Profile/Profile';

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    layers: z.array(LayerSchema),
    owner: OwnerSchema,
    private: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});
