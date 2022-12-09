import { buildSchema, ResolverData } from 'type-graphql';
import { Container } from 'typedi';

import { IContext } from '../../types';
import { ProjectResolver } from './resolvers/ProjectResolver/ProjectResolver';
import { UserResolver } from './resolvers/UserResolver/UserResolver';

export const schema = buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    container: ({ context }: ResolverData<IContext>) => Container.of(context.requestId)
});
