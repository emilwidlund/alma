import { z } from 'zod';

import { InputSchema } from '../../../graph/Input/Input';
import { NodeSchema, WebGLNodeTypeSchema } from '../../../graph/Node/Node';

export const Vector4NodeSchema = NodeSchema.extend({
    type: z.literal(WebGLNodeTypeSchema.enum.VECTOR_4),
    inputs: z.object({
        color: InputSchema
    })
});
