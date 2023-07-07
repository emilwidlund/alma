import { z } from 'zod';

import { InputSchema } from '../../../graph/Input/Input';
import { NodeSchema, WebGLNodeTypeSchema } from '../../../graph/Node/Node';

export const RendererNodeSchema = NodeSchema.extend({
    type: z.literal(WebGLNodeTypeSchema.enum.RENDERER),
    inputs: z.object({
        color: InputSchema
    })
});
