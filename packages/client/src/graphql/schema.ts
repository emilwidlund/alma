import { PrismaClient, Profile } from '@prisma/client';

export type Context = {
    user: Profile | null;
    db: PrismaClient;
};
