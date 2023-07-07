import { z } from 'zod';

import { OutputSchema } from '../Output/Output';
import { PortValueSchema, PortSchema } from '../Port/Port';

export const InputBaseValueSchema = PortValueSchema;

export const InputDefaultValueSchema = InputBaseValueSchema;

export const InputValueSchema = z.union([InputBaseValueSchema, OutputSchema]);

export const InputSchema = PortSchema.extend({
    defaultValue: InputDefaultValueSchema,
    value: InputValueSchema
});
