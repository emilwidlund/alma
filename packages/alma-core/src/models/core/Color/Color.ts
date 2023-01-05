import { z } from 'zod';

export const RGBASchema = z.tuple([z.number(), z.number(), z.number(), z.number()]);
