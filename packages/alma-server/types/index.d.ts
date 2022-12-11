import { PrismaClient, User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type AuthJWTPayload = JwtPayload & {
    userId: string;
};

export type ResolvedUser = User;

export interface IContext {
    requestId: string;
    db: PrismaClient;
    user?: ResolvedUser;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ALMA_JWT_SECRET: string;
            ALMA_SESSION_SECRET: string;
            ALMA_DATABASE_URL: string;
            ALMA_REDIS_URL: string;

            /** OAuth Client IDs & Secrets */
            ALMA_GOOGLE_OAUTH_CLIENT_ID: string;
            ALMA_GOOGLE_OAUTH_CLIENT_SECRET: string;
        }
    }
}
