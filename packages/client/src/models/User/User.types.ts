import { z } from 'zod';

import { AuthorSchema, UserSchema } from './User';

export type User = z.infer<typeof UserSchema>;

export type Author = z.infer<typeof AuthorSchema>;
