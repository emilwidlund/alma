import { GraphQLJSONObject } from 'graphql-scalars';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UpdateProjectDataArgs {
    @Field()
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    mediaUrl?: string;

    @Field(() => GraphQLJSONObject, { nullable: true })
    circuit?: object;

    @Field({ nullable: true })
    private?: boolean;
}
