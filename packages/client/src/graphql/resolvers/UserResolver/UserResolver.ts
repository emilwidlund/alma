import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import { Project } from '../../models/Project/Project';
import { Me, User } from '../../models/User/User';
import type { Context } from '../../schema';

@Resolver(of => User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async getUser(
        @Ctx() context: Context,
        @Arg('id', { nullable: true }) id?: string,
        @Arg('username', { nullable: true }) username?: string
    ) {
        return context.db.user.findFirst({
            where: { OR: [{ id }, { username }] }
        });
    }

    @Authorized()
    @Query(() => Me)
    async me(@Ctx() context: Context) {
        return context.db.user.findFirst({
            where: { id: context.user?.id },
            include: { projects: true }
        });
    }

    @Authorized()
    @Mutation(() => Boolean)
    async follow(@Ctx() context: Context, @Arg('targetUserId') targetUserId: string) {
        /** Can't follow yourself */
        if (targetUserId === context.user?.id) {
            return false;
        }

        /** Don't attempt to follow if relationship already exists */
        if (await context.db.relationship.findFirst({ where: { userId: context.user!.id, targetUserId } })) {
            return false;
        }

        await context.db.relationship.create({
            data: {
                userId: context.user!.id,
                targetUserId
            }
        });

        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async unfollow(@Ctx() context: Context, @Arg('targetUserId') targetUserId: string) {
        /** Don't attempt to unfollow if relationship doesn't exist */
        if (!(await context.db.relationship.findFirst({ where: { userId: context.user!.id, targetUserId } }))) {
            return false;
        }

        await context.db.relationship.delete({
            where: {
                userId_targetUserId: {
                    userId: context.user!.id,
                    targetUserId
                }
            }
        });

        return true;
    }

    @FieldResolver(() => [Project])
    async projects(@Root() user: User, @Ctx() context: Context) {
        return context.db.project.findMany({
            where: { ownerId: user.id, private: false },
            include: { owner: true },
            orderBy: { updatedAt: 'desc' }
        });
    }

    @FieldResolver(() => [User])
    async followers(@Root() user: User, @Ctx() context: Context) {
        const relationships = await context.db.relationship.findMany({
            where: { targetUserId: user.id },
            include: { user: true, targetUser: true },
            orderBy: { updatedAt: 'desc' }
        });

        return relationships.map(relationship => relationship.user);
    }

    @FieldResolver(() => Number)
    async followersCount(@Root() user: User, @Ctx() context: Context) {
        return context.db.relationship.count({
            where: { targetUserId: user.id }
        });
    }

    @FieldResolver(() => [User])
    async following(@Root() user: User, @Ctx() context: Context) {
        const relationships = await context.db.relationship.findMany({
            where: { userId: user.id },
            include: { user: true, targetUser: true },
            orderBy: { updatedAt: 'desc' }
        });

        return relationships.map(relationship => relationship.targetUser);
    }

    @FieldResolver(() => Number)
    async followingCount(@Root() user: User, @Ctx() context: Context) {
        return context.db.relationship.count({
            where: { userId: user.id }
        });
    }

    @FieldResolver(() => Boolean)
    async isFollowedByMe(@Root() user: User, @Ctx() context: Context) {
        if (!context.user?.id) {
            return false;
        }

        return !!(await context.db.relationship.findFirst({
            where: {
                userId: context.user?.id,
                targetUserId: user.id
            }
        }));
    }
}
