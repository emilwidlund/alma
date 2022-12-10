import { Arg, Args, ArgsType, Ctx, Field, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';

import { IContext } from '../../../../types';
import { Project } from '../../models/Project/Project';

@ArgsType()
class UpdateProjectDataArgs {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    mediaUrl?: string;

    @Field({ nullable: true })
    circuit?: string;

    @Field({ nullable: true })
    private?: boolean;
}

@Resolver(Project)
export class ProjectResolver {
    @Query(() => Project)
    async getProject(@Arg('id') id: string, @Ctx() context: IContext) {
        return context.db.project.findFirst({ where: { id, private: false }, include: { owner: true } });
    }

    @Query(() => [Project])
    async getProjects(@Arg('userId') id: string, @Ctx() context: IContext) {
        return context.db.project.findMany({ where: { ownerId: id, private: false }, include: { owner: true } });
    }

    // @Authorized()
    @Mutation(() => Project)
    async updateProject(
        @Arg('id') id: string,
        @Args() { name, mediaUrl, circuit, private: priv }: UpdateProjectDataArgs,
        @Ctx() context: IContext
    ) {
        return context.db.project.update({
            where: { id },
            data: { name, mediaUrl, circuit, private: priv },
            include: { owner: true }
        });
    }

    @Subscription({
        topics: `PROJECT:UPDATE`,
        filter: ({ payload, args }: { payload: Project; args: { id: string } }) => payload.id === args.id
    })
    projectUpdate(@Root() projectPayload: Project, @Arg('id') id: string): Project {
        return projectPayload;
    }
}
