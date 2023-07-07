import { z } from 'zod';

import { RendererNodeSchema } from './RendererNode';

export type RendererNode = z.infer<typeof RendererNodeSchema>;
