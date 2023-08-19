import { z } from 'zod';

import { ContextSchema } from '../Context/Context';
import { FragmentSchema } from '../Fragment/Fragment';

export const BlendingModeSchema = z.enum(['NONE', 'NORMAL', 'ADD', 'SCREEN', 'MULTIPLY', 'OVERLAY']);

export const LayerTypeSchema = z.enum(['FRAGMENT', 'CIRCUIT']);

export const LayerSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: LayerTypeSchema,
    context: ContextSchema,
    enabled: z.boolean(),
    blendingMode: BlendingModeSchema
});

export const FragmentLayerSchema = LayerSchema.extend({
    context: FragmentSchema
});
