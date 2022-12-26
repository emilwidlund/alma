import { ProjectType } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Field, ObjectType } from 'type-graphql';

import { User } from '../User/User';

@ObjectType()
export class Project {
    /** Identifier */
    @Field()
    id: string;

    /** Name */
    @Field()
    name: string;

    /** Type */
    @Field()
    type: ProjectType;

    /** Source */
    @Field({ nullable: true })
    source?: string;

    /** Serialized Circuit */
    @Field(() => GraphQLJSONObject, { nullable: true })
    circuit?: object;

    /** Media URL */
    @Field({ nullable: true })
    mediaUrl?: string;

    /** Private Flag */
    @Field()
    private: boolean;

    /** Owner Id */
    @Field()
    ownerId: string;

    /** Owner */
    @Field(() => User)
    owner: User;

    /** Created At */
    @Field()
    createdAt: Date;

    /** Updated At */
    @Field()
    updatedAt: Date;
}
