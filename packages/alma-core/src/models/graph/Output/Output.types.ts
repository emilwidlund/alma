import { z } from 'zod';

import { OutputSchema, OutputValueSchema } from './Output';

export type OutputValue = z.infer<typeof OutputValueSchema>;
export type Output = z.infer<typeof OutputSchema>;
