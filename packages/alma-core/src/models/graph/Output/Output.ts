import { z } from 'zod';

import { PortSchema } from '../Port/Port';

export const OutputValueSchema = z.any();

export const OutputSchema = PortSchema.extend({
    value: OutputValueSchema
});
