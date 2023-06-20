import { z } from 'zod';

import { BlendingModeSchema, FragmentLayerSchema, LayerSchema } from './Layer';

export type BlendingMode = z.infer<typeof BlendingModeSchema>;

export type Layer = z.infer<typeof LayerSchema>;
export type SourceLayer = z.infer<typeof FragmentLayerSchema>;
