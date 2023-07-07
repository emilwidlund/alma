import { z } from 'zod';

import { ProjectSchema } from './Project';

export type Project = z.infer<typeof ProjectSchema>;
