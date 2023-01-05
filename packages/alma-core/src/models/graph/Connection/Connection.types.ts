import { z } from 'zod';

import { ConnectionSchema } from './Connection';

export type Connection = z.infer<typeof ConnectionSchema>;
