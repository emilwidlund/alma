import { z } from 'zod';

import { RGBASchema } from './Color';

export type RGBA = z.infer<typeof RGBASchema>;
