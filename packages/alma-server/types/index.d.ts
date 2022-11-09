import { PrismaClient } from '@prisma/client';
import { ContainerInstance } from 'typedi';

export interface IContext {
    requestId: string;
    db: PrismaClient;
    container: ContainerInstance;
}
