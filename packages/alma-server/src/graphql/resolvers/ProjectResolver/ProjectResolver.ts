import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { Arg, Args, Authorized, Ctx, Mutation, Publisher, PubSub, Query, Resolver } from 'type-graphql';

import { IContext } from '../../../../types';
import { Project } from '../../models/Project/Project';
import { UpdateProjectDataArgs } from './ProjectResolver.args';
import { ProjectSubscriptionTrigger } from './ProjectResolver.types';

@Resolver(Project)
export class ProjectResolver {
    @Query(() => Project)
    async getProject(@Arg('id') id: string, @Ctx() context: IContext) {
        return context.db.project.findFirst({
            where: { id, private: false, deletedAt: undefined },
            include: { owner: true }
        });
    }

    @Query(() => [Project])
    async getProjects(@Arg('userId') id: string, @Ctx() context: IContext) {
        return context.db.project.findMany({
            where: { ownerId: id, private: false, deletedAt: undefined },
            include: { owner: true },
            orderBy: { updatedAt: 'desc' }
        });
    }

    // @Authorized()
    @Mutation(() => Project)
    async updateProject(
        @Args() { id, name, mediaUrl, circuit, private: priv }: UpdateProjectDataArgs,
        @Ctx() context: IContext,
        @PubSub(ProjectSubscriptionTrigger.PROJECT_UPDATE)
        publish: Publisher<Prisma.ProjectGetPayload<Prisma.ProjectArgs>>
    ) {
        const project = await context.db.project.findUnique({ where: { id } });

        /** Make sure that project belongs to the authenticated user */
        /* if (project?.ownerId !== context.user?.id) {
            return new ApolloError('Not Authorized to perform this action');
        } */

        const results = await context.db.project.update({
            where: { id },
            data: { name, mediaUrl, circuit, private: priv },
            include: { owner: true }
        });

        publish(results);

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

        await context.db.project.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}
