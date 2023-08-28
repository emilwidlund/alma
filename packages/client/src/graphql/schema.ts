import { PrismaClient, Profile } from '@prisma/client';

export type Context = {
    profile: Profile | null;
    db: PrismaClient;
};
