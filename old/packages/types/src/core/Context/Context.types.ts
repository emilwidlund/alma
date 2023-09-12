import { z } from 'zod';

import { ContextSchema } from './Context';

export type Context = z.infer<typeof ContextSchema>;
