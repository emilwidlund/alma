import { Arg, Authorized, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import { IContext } from '../../../../types';
import { User } from '../../models/User/User';

@Resolver(of => User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async getUser(
        @Ctx() context: IContext,
        @Arg('id', { nullable: true }) id?: string,
        @Arg('username', { nullable: true }) username?: string
    ) {
        return context.db.user.findFirst({
            where: { deletedAt: undefined, OR: [{ id }, { username }] }
        });
    }

    @Authorized()
    @Query(() => User)
    async me(@Ctx() context: IContext) {
        return context.db.user.findFirst({
            where: { id: context.user?.id, deletedAt: undefined },
            include: { projects: true }
        });
    }

    @FieldResolver(() => User)
    async projects(@Root() user: User, @Ctx() context: IContext) {
        return context.db.project.findMany({
            where: { ownerId: user.id, deletedAt: undefined },
            include: { owner: true },
            orderBy: { updatedAt: 'desc' }
        });
    }
}
