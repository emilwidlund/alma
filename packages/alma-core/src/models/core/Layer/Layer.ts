import { z } from 'zod';

import { CircuitSchema } from '../../graph/Circuit/Circuit';
import { ContextSchema } from '../Context/Context';
import { SourceSchema } from '../Source/Source';

export const BlendingModeSchema = z.enum(['NONE', 'NORMAL', 'ADDITIVE', 'SUBTRACTIVE', 'MUTLIPLY']);

export const LayerSchema = z.object({
    id: z.string(),
    name: z.string(),
    context: ContextSchema,
    enabled: z.boolean(),
    blendingMode: BlendingModeSchema
});

export const CircuitLayerSchema = LayerSchema.extend({
    context: CircuitSchema
});

export const SourceLayerSchema = LayerSchema.extend({
    context: SourceSchema
});
