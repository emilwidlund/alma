import { z } from 'zod';

import { Vector4NodeSchema } from './Vector4Node';

export type Vector4Node = z.infer<typeof Vector4NodeSchema>;
