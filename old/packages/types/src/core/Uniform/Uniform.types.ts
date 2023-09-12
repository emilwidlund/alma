import { z } from 'zod';

import { UniformSchema } from './Uniform';

export type Uniform = z.infer<typeof UniformSchema>;
