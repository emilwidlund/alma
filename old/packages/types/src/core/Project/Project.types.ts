import { z } from 'zod';

import { ProjectVisibilitySchema } from './Project';

export type ProjectVisibility = z.infer<typeof ProjectVisibilitySchema>;
