import { AuthChecker, buildSchema } from 'type-graphql';

import { IContext } from '../../types';
import { ProjectResolver } from './resolvers/ProjectResolver/ProjectResolver';
import { UserResolver } from './resolvers/UserResolver/UserResolver';
import { pubSub } from './subscriptions';

export const authChecker: AuthChecker<IContext> = async ({ root, args, context, info }, roles) => {
    if (context.user?.id) {
        const user = await context.db.user.findFirstOrThrow({ where: { id: context.user.id } });

        return !!user;
    }

    return false;
};

export const schema = buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    pubSub,
    authChecker
});
