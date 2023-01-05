import { z } from 'zod';

import { BlendingModeSchema, CircuitLayerSchema, SourceLayerSchema, LayerSchema } from './Layer';

export type BlendingMode = z.infer<typeof BlendingModeSchema>;

export type Layer = z.infer<typeof LayerSchema>;
export type CircuitLayer = z.infer<typeof CircuitLayerSchema>;
export type SourceLayer = z.infer<typeof SourceLayerSchema>;
