import { buildSchema, ResolverData } from 'type-graphql';
import {Container} from 'typedi';

import { UserResolver } from './resolvers/UserResolver/UserResolver';
import { IContext } from '../../types';

export const schema = buildSchema({
    resolvers: [UserResolver],
    container: ({ context }: ResolverData<IContext>) => Container.of(context.requestId)
});
