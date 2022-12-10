import { PrismaClient } from '@prisma/client';

export interface IContext {
    requestId: string;
    db: PrismaClient;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ALMA_SESSION_SECRET: string;
            ALMA_DATABASE_URL: string;
        }
    }
}
