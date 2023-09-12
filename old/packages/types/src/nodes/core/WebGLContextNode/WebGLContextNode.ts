import { z } from 'zod';

import { InputSchema } from '../../../graph/Input/Input';
import { NodeSchema, WebGLNodeTypeSchema } from '../../../graph/Node/Node';

export const WebGLContextNodeSchema = NodeSchema.extend({
    type: z.literal(WebGLNodeTypeSchema.enum.WEBGL_CONTEXT),
    inputs: z.object({
        color: InputSchema
    })
});
