import { ApolloError } from 'apollo-server-core';
import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import { IContext } from '../../../../types';
import { Comment } from '../../models/Comment/Comment';
import { Project } from '../../models/Project/Project';
import { CreateProjectDataArgs, UpdateProjectDataArgs } from './ProjectResolver.args';

@Resolver(Project)
export class ProjectResolver {
    @Authorized()
    @Mutation(() => Project)
    async createProject(
        @Args() { name, mediaUrl, circuit, private: priv }: CreateProjectDataArgs,
        @Ctx() context: IContext
    ) {
        if (!context.user?.id) {
            return new ApolloError('Not Authorized to perform this action');
        }

        return context.db.project.create({
            data: {
                name,
                mediaUrl,
                circuit,
                private: priv,
                ownerId: context.user.id
            },
            include: {
                owner: true,
                likes: true,
                comments: true
            }
        });
    }

    @Query(() => Project)
    async getProject(@Arg('id') id: string, @Ctx() context: IContext) {
        return context.db.project.findFirst({
            where: { id, private: false },
            include: { owner: true }
        });
    }

    @Query(() => [Project])
    async getProjects(@Arg('userId') id: string, @Ctx() context: IContext) {
        return context.db.project.findMany({
            where: { ownerId: id, private: false },
            include: { owner: true },
            orderBy: { updatedAt: 'desc' }
        });
    }

    @Authorized()
    @Query(() => [Project])
    async likedProjects(@Ctx() context: IContext) {
        const userWithProjects = await context.db.user.findUnique({
            where: { id: context.user?.id },
            include: { likes: { include: { project: true } } }
        });

        return userWithProjects?.likes.map(like => like.project);
    }

    @Authorized()
    @Mutation(() => Project)
    async updateProject(
        @Args() { id, name, mediaUrl, circuit, private: priv }: UpdateProjectDataArgs,
        @Ctx() context: IContext
    ) {
        const project = await context.db.project.findUnique({ where: { id } });

        /** Make sure that project belongs to the authenticated user */
        if (project?.ownerId !== context.user?.id) {
            return new ApolloError('Not Authorized to perform this action');
        }

        const results = await context.db.project.update({
            where: { id },
            data: { name, mediaUrl, circuit, private: priv },
            include: { owner: true }
        });

        return results;
    }

    @Authorized()
    @Mutation(() => Project)
    async deleteProject(@Arg('id') id: string, @Ctx() context: IContext) {
        const project = await context.db.project.findUnique({ where: { id } });

        /** Make sure that project belongs to the authenticated user */
        if (project?.ownerId !== context.user?.id) {
            return new ApolloError('Not Authorized to perform this action');
        }

        await context.db.project.delete({
            where: { id }
        });
    }

    @Authorized()
    @Mutation(() => Boolean)
    async likeProject(@Arg('id') id: string, @Ctx() context: IContext) {
        if (!context.user?.id) {
            return new ApolloError('Not Authorized to perform this action');
        }

        /** Don't attempt to like if like already exists */
        if (await context.db.like.findFirst({ where: { userId: context.user!.id, projectId: id } })) {
            return false;
        }

        await context.db.like.create({ data: { projectId: id, userId: context.user.id } });

        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async unlikeProject(@Arg('id') id: string, @Ctx() context: IContext) {
        if (!context.user?.id) {
            return new ApolloError('Not Authorized to perform this action');
        }

        /** Don't attempt to like if like doesn't exist */
        if (!(await context.db.like.findFirst({ where: { userId: context.user!.id, projectId: id } }))) {
            return false;
        }

        await context.db.like.delete({ where: { projectId_userId: { projectId: id, userId: context.user.id } } });

        return true;
    }

    @FieldResolver(() => Number)
    async likesCount(@Root() project: Project, @Ctx() context: IContext) {
        return context.db.like.count({ where: { projectId: project.id } });
    }

    @FieldResolver(() => [Comment])
    async comments(@Root() project: Project, @Ctx() context: IContext) {
        return context.db.comment.findMany({ where: { projectId: project.id } });
    }

    @FieldResolver(() => Number)
    async commentsCount(@Root() project: Project, @Ctx() context: IContext) {
        return context.db.comment.count({ where: { projectId: project.id } });
    }

    @FieldResolver(() => Boolean)
    async isLikedByMe(@Root() project: Project, @Ctx() context: IContext) {
        if (!context.user?.id) {
            return false;
        }

        return !!(await context.db.like.findFirst({ where: { projectId: project.id, userId: context.user?.id } }));
    }
}
