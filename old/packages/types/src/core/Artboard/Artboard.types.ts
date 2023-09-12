import { z } from 'zod';

import { ArtboardSchema } from './Artboard';

export type Artboard = z.infer<typeof ArtboardSchema>;
