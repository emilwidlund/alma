import { z } from 'zod';

import { BlendingModeSchema, CircuitLayerSchema, FragmentLayerSchema, LayerSchema } from './Layer';

export type BlendingMode = z.infer<typeof BlendingModeSchema>;

export type Layer = z.infer<typeof LayerSchema>;
export type FragmentLayer = z.infer<typeof FragmentLayerSchema>;
export type CircuitLayer = z.infer<typeof CircuitLayerSchema>;
