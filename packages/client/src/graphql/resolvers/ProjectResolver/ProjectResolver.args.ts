import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateProjectDataArgs {
    @Field()
    name: string;

    @Field()
    private: boolean;
}

@ArgsType()
export class UpdateProjectDataArgs {
    @Field()
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    private?: boolean;
}
