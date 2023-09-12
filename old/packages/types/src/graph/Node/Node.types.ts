import { z } from 'zod';

import { NodeSchema } from './Node';

export type Node = z.infer<typeof NodeSchema>;
