import { z } from 'zod';

import { LayerSchema } from '../Layer/Layer';
import { OwnerSchema } from '../Profile/Profile';
import { UniformSchema } from '../Uniform/Uniform';

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    layers: z.array(LayerSchema),
    uniforms: z.array(UniformSchema),
    owner: OwnerSchema,
    private: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});
