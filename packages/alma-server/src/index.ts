import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';

import { start } from './server';

/** Initialize the Alma Server */
start(new PrismaClient());
