import { z } from 'zod';

import { OwnerSchema, ProfileSchema } from './Profile';

export type Profile = z.infer<typeof ProfileSchema>;

export type Owner = z.infer<typeof OwnerSchema>;
