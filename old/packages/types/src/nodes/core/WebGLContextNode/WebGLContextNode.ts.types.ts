import { z } from 'zod';

import { WebGLContextNodeSchema } from './WebGLContextNode';

export type WebGLContextNode = z.infer<typeof WebGLContextNodeSchema>;
