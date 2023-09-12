import { z } from 'zod';

import { AdditionNodeSchema } from './AdditionNode';

export type AdditionNode = z.infer<typeof AdditionNodeSchema>;
