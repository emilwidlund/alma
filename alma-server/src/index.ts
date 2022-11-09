import { PrismaClient } from '@prisma/client';

import { start } from './server';

/** Initialize the Alma Server */
start(new PrismaClient());
