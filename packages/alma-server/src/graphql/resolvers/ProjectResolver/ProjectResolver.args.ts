import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UpdateProjectDataArgs {
    @Field()
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    mediaUrl?: string;

    @Field({ nullable: true })
    circuit?: string;

    @Field({ nullable: true })
    private?: boolean;
}
