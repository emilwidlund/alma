import { buildSchema } from 'type-graphql';

import { resolvers } from './generated/type-graphql';

export const schema = await buildSchema({
    resolvers,
    validate: false
});
