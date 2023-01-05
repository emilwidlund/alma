import { z } from 'zod';

import { OutputSchema } from '../Output/Output';
import { PortSchema } from '../Port/Port';

export const InputBaseValueSchema = z.any();

export const InputDefaultValueSchema = InputBaseValueSchema;

export const InputValueSchema = z.union([InputBaseValueSchema, OutputSchema]);

export const InputSchema = PortSchema.extend({
    validator: z.function().args(InputValueSchema).returns(z.boolean()).optional(),
    defaultValue: InputDefaultValueSchema,
    value: InputValueSchema
});
