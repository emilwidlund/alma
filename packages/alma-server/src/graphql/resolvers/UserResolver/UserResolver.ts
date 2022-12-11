import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';

import { IContext } from '../../../../types';
import { User } from '../../models/User/User';

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async getUser(@Arg('id') id: string, @Ctx() context: IContext) {
        return context.db.user.findFirst({ where: { id, deletedAt: undefined } });
    }

    @Authorized()
    @Query(() => User)
    async me(@Ctx() context: IContext) {
        return context.db.user.findFirst({
            where: { id: context.user?.id, deletedAt: undefined },
            include: { projects: true }
        });
    }
}
