import { buildSchema } from 'type-graphql';

import { ProjectResolver } from './resolvers/ProjectResolver/ProjectResolver';
import { UserResolver } from './resolvers/UserResolver/UserResolver';
import { pubSub } from './subscriptions';

export const schema = buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    pubSub
});
