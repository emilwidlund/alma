import path from 'path';
import { AuthChecker, buildSchema } from 'type-graphql';

import { IContext } from '../../types';
import { FeedResolver } from './resolvers/FeedResolver/FeedResolver';
import { ProjectResolver } from './resolvers/ProjectResolver/ProjectResolver';
import { UserResolver } from './resolvers/UserResolver/UserResolver';

export const authChecker: AuthChecker<IContext> = async ({ root, args, context, info }, roles) => {
    return !!context.user;
};

export const schema = buildSchema({
    resolvers: [UserResolver, ProjectResolver, FeedResolver],
    authChecker,
    emitSchemaFile: {
        path: path.resolve(__dirname, '../../generated/schema.gql')
    }
});
