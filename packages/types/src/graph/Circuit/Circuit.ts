import { z } from 'zod';

import { RendererNodeSchema } from '../../nodes/core/RendererNode/RendererNode';
import { ConnectionSchema } from '../Connection/Connection';
import { NodeSchema } from '../Node/Node';

export const CircuitSchema = z.object({
    id: z.string(),
    name: z.string(),
    nodes: z.array(NodeSchema),
    root: RendererNodeSchema,
    connections: z.array(ConnectionSchema),
    uniforms: z.object({}).optional()
});
