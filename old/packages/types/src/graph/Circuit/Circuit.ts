import { z } from 'zod';

import { ConnectionSchema } from '../Connection/Connection';
import { NodeSchema } from '../Node/Node';

export const CircuitSchema = z.object({
    id: z.string(),
    name: z.string(),
    nodes: z.array(z.tuple([z.string(), NodeSchema])),
    connections: z.array(z.tuple([z.string(), ConnectionSchema])),
    uniforms: z.object({}).optional()
});
