import { z } from 'zod';

import { FragmentSchema } from './Fragment';

export type Fragment = z.infer<typeof FragmentSchema>;
