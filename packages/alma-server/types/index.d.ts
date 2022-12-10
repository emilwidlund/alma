import { PrismaClient } from '@prisma/client';
import { ContainerInstance } from 'typedi';

export interface IContext {
    requestId: string;
    db: PrismaClient;
    container: ContainerInstance;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ALMA_SESSION_SECRET: string;
            ALMA_DATABASE_URL: string;
        }
    }
}
