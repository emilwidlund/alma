import { Authorized, Ctx, Query, Resolver } from 'type-graphql';

import { IContext } from '../../../../types';
import { Project } from '../../models/Project/Project';

@Resolver(Project)
export class FeedResolver {
    @Authorized()
    @Query(() => [Project])
    async feed(@Ctx() context: IContext) {
        const user = await context.db.user.findFirst({
            where: { id: context.user?.id },
            include: { following: true }
        });

        if (!user || !context.user) {
            return [];
        }

        return context.db.project.findMany({
            where: {
                ownerId: {
                    in: [...user.following.map(relationship => relationship.targetUserId), context.user.id]
                }
            },
            include: { owner: true, likes: true, comments: true },
            orderBy: { likes: { _count: 'desc' }, createdAt: 'desc' }
        });
    }

    @Query(() => [Project])
    async popular(@Ctx() context: IContext) {
        const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        return context.db.project.findMany({
            where: { createdAt: { gte: lastWeek } },
            include: { owner: true, likes: true, comments: true },
            orderBy: { likes: { _count: 'desc' } }
        });
    }
}
