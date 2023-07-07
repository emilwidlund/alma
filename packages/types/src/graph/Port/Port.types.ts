import { z } from 'zod';

import { PortSchema, PortTagSchema, PortTypeSchema } from './Port';

export type PortValue = {
    type: z.infer<typeof PortTypeSchema>;
    tag: z.infer<typeof PortTagSchema>;
    val: PortValue | PortValue[] | number;
};

export type Port = z.infer<typeof PortSchema>;
