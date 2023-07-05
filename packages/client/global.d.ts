/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

export declare global {
    var handleSignInWithGoogle: ({ credential }: { credential: string }) => Promise<void>;
    var prisma: PrismaClient | undefined;
}
