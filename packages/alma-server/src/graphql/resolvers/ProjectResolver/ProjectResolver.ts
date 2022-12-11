import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import {
    Arg,
    Args,
    Authorized,
    Ctx,
    Mutation,
    Publisher,
    PubSub,
    Query,
    Resolver,
    Root,
    Subscription
} from 'type-graphql';

import { IContext } from '../../../../types';
import { Project } from '../../models/Project/Project';
import { pubSub } from '../../subscriptions';
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
            include: { owner: true }
        });
    }

    @Authorized()
    @Mutation(() => Project)
    async updateProject(
        @Args() { id, name, mediaUrl, circuit, private: priv }: UpdateProjectDataArgs,
        @Ctx() context: IContext,
        @PubSub(ProjectSubscriptionTrigger.PROJECT_UPDATE)
        publish: Publisher<Prisma.ProjectGetPayload<Prisma.ProjectArgs>>
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

    @Subscription({
        subscribe: withFilter(
            () => pubSub.asyncIterator([ProjectSubscriptionTrigger.PROJECT_UPDATE]),
            (payload: Prisma.ProjectGetPayload<Prisma.ProjectArgs>, variables: { id: string }) => {
                return payload.id === variables.id;
            }
        )
    })
    projectUpdate(@Root() projectPayload: Project, @Arg('id') id: string): Project {
        return projectPayload;
    }
}
