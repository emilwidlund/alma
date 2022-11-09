import { PrismaClient } from '@prisma/client';
import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { User } from '../../models/User/User';

@Service()
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly db: PrismaClient) {}

    @Query(() => User)
    async getUser(@Arg('id') id: string): Promise<User | null> {
        return this.db.user.findFirst({ where: { id: id } });
    }
}
