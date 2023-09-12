import { z } from 'zod';

import { CircuitSchema } from './Circuit';

export type Circuit = z.infer<typeof CircuitSchema>;
