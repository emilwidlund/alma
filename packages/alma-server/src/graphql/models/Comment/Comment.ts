import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Comment {
    /** Identifier */
    @Field()
    id: string;

    /** Project Identifier */
    @Field()
    projectId: string;

    /** User Identifier */
    @Field()
    userId: string;

    /** Text Content */
    @Field()
    text: string;

    /** Created At */
    @Field()
    createdAt: Date;

    /** Updated At */
    @Field()
    updatedAt: Date;
}
