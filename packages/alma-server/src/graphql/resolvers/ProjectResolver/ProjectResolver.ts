import { PrismaClient } from '@prisma/client';
import { Arg, Args, ArgsType, Authorized, Field, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Service } from 'typedi';

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

@Service()
@Resolver(Project)
export class ProjectResolver {
    constructor(private readonly db: PrismaClient) {}

    @Query(() => Project)
    async getProject(@Arg('id') id: string) {
        return this.db.project.findFirst({ where: { id, private: false } });
    }

    @Query(() => [Project])
    async getProjects(@Arg('userId') id: string) {
        return this.db.project.findMany({ where: { ownerId: id, private: false } });
    }

    @Authorized()
    @Mutation(() => Project)
    async updateProject(@Arg('id') id: string, @Args() { name, mediaUrl, circuit }: UpdateProjectDataArgs) {
        return this.db.project.update({ where: { id }, data: { name, mediaUrl, circuit } });
    }

    @Subscription({
        topics: `PROJECT:UPDATE`,
        filter: ({ payload, args }: { payload: Project; args: { id: string } }) => payload.id === args.id
    })
    projectUpdate(@Root() projectPayload: Project, @Arg('id') id: string): Project {
        return projectPayload;
    }
}
