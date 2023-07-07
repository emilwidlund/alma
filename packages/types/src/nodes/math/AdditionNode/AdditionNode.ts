import { z } from 'zod';

import { InputSchema } from '../../../graph/Input/Input';
import { NodeSchema, WebGLNodeTypeSchema } from '../../../graph/Node/Node';
import { OutputSchema } from '../../../graph/Output/Output';

export const AdditionNodeSchema = NodeSchema.extend({
    type: z.literal(WebGLNodeTypeSchema.enum.ADDITION),
    inputs: z.object({
        a: InputSchema,
        b: InputSchema
    }),
    outputs: z.object({
        output: OutputSchema
    })
});
