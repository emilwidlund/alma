import { z } from 'zod';

import { LayerSchema } from '../Layer/Layer';
import { Layer } from '../Layer/Layer.types';
import { OwnerSchema } from '../Profile/Profile';
import { Owner } from '../Profile/Profile.types';
import { UniformSchema } from '../Uniform/Uniform';
import { Uniform } from '../Uniform/Uniform.types';

export interface Project {
    id: string;
    name: string;
    image: string;
    layers: Layer[];
    uniforms: Uniform[];
    owner: Owner;
    visibility: 'PUBLIC' | 'PRIVATE';
    origin: Project | null;
    forks: Project[];
    createdAt: string;
    updatedAt: string;
}

export const ProjectVisibilitySchema = z.enum(['PUBLIC', 'PRIVATE']);

export const ProjectSchema: z.ZodType<Project> = z.lazy(() =>
    z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
        layers: z.array(LayerSchema),
        uniforms: z.array(UniformSchema),
        owner: OwnerSchema,
        visibility: ProjectVisibilitySchema,
        origin: ProjectSchema.nullable(),
        forks: z.array(ProjectSchema),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime()
    })
);
