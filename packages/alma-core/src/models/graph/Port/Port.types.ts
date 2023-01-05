import { z } from 'zod';

import { PortSchema } from './Port';

export type Port = z.infer<typeof PortSchema>;
