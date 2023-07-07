import { z } from 'zod';

import { InputBaseValueSchema, InputDefaultValueSchema, InputSchema, InputValueSchema } from './Input';

export type InputBaseValue = z.infer<typeof InputBaseValueSchema>;
export type InputDefaultValue = z.infer<typeof InputDefaultValueSchema>;
export type InputValue = z.infer<typeof InputValueSchema>;
export type Input = z.infer<typeof InputSchema>;
