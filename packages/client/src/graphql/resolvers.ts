import { IResolvers } from '@graphql-tools/utils';

import { Context } from './schema';

export const resolvers: IResolvers<any, Context> = {
    Query: {
        profile: async (parent, args, context) => {
            return await context.db.profile.findFirst({
                where: { OR: [{ userId: args.id }, { username: args.username }] },
                include: { projects: { include: { likes: true } } }
            });
        },
        project: async (parent, args, context) => {
            return await context.db.project.findUnique({
                where: { id: args.id, private: false },
                include: { owner: true, likes: true, comments: { include: { profile: true } } }
            });
        },
        projects: async (parent, args, context) => {
            return await context.db.project.findMany({
                where: { ownerId: args.userId, private: false },
                include: { owner: true, likes: true, comments: { include: { profile: true } } }
            });
        }
    }
};
