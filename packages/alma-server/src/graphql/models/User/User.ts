import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    /** Identifier */
    @Field()
    id: string;

    /** Name */
    @Field()
    name: string;

    /** Username */
    @Field()
    username: string;

    /** Media URL */
    @Field({ nullable: true })
    mediaUrl?: string;

    /** Created At */
    @Field()
    createdAt: Date;

    /** Updated At */
    @Field()
    updatedAt: Date;
}

@ObjectType()
export class Me extends User {
    /** Email */
    @Field()
    email: string;
}
