import { z } from 'zod';

import { SourceSchema } from './Source';

export type Source = z.infer<typeof SourceSchema>;
