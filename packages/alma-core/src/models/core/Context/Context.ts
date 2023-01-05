import { z } from 'zod';

import { CircuitSchema } from '../../graph/Circuit/Circuit';
import { SourceSchema } from '../Source/Source';

export const ContextSchema = z.union([CircuitSchema, SourceSchema]);
