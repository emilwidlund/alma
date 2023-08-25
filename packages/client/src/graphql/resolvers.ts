import { IResolvers } from '@graphql-tools/utils';

import { Context } from './schema';

export const resolvers: IResolvers<any, Context> = {
    Query: {
        getProjects: async (parent, args, context) => {
            console.log(args);

            return await context.db.project.findMany({
                where: { ownerId: args.userId }
            });
        }
    }
};
