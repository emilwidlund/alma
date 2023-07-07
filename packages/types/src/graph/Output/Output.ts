import { PortValueSchema, PortSchema } from '../Port/Port';

export const OutputValueSchema = PortValueSchema;

export const OutputSchema = PortSchema.extend({
    value: PortValueSchema
});
