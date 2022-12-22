import { PrismaClient, User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type AuthJWTPayload = JwtPayload & {
    userId: string;
};

export type ResolvedUser = User;

export interface IContext {
    requestId: string;
    db: PrismaClient;
    user?: ResolvedUser | null;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            ALMA_JWT_SECRET: string;
            ALMA_SESSION_SECRET: string;
            ALMA_DATABASE_URL: string;

            /** OAuth Client IDs & Secrets */
            ALMA_GOOGLE_OAUTH_CLIENT_ID: string;
            ALMA_GOOGLE_OAUTH_CLIENT_SECRET: string;
        }
    }

    namespace Express {
        export interface Request {
            id: string;
            user?: ResolvedUser | null;
        }
    }
}
