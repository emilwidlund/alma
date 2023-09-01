import { z } from 'zod';

import { CircuitSchema } from '../../graph';
import { FragmentSchema } from '../Fragment/Fragment';

export const BlendingModeSchema = z.enum(['NONE', 'NORMAL', 'ADD', 'SCREEN', 'MULTIPLY', 'OVERLAY']);

export const LayerTypeSchema = z.enum(['FRAGMENT', 'CIRCUIT']);

export const LayerBaseSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: LayerTypeSchema,
    enabled: z.boolean(),
    blendingMode: BlendingModeSchema,
    index: z.number().positive()
});

export const FragmentLayerSchema = LayerBaseSchema.extend({
    fragment: FragmentSchema
});

export const CircuitLayerSchema = LayerBaseSchema.extend({
    circuit: CircuitSchema
});

export const LayerSchema = z.union([FragmentLayerSchema, CircuitLayerSchema]);
