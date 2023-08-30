import { ApolloError } from '@apollo/client';
import { IResolvers } from '@graphql-tools/utils';
import { PrismaClient, Profile } from '@prisma/client';
import { Layer } from '@usealma/types';

import { Context } from './schema';

const withUserAuthorization = <TParent, TArgs, TReturn>(
    callback: (parent: TParent, args: TArgs, context: { profile: Profile; db: PrismaClient }) => TReturn
) => {
    return async (parent: TParent, args: TArgs, context: Context) => {
        if (!context.profile) {
            return new ApolloError({ errorMessage: 'User Authorization failed' });
        }

        return callback(parent, args, context as { profile: Profile; db: PrismaClient });
    };
};

export const resolvers: IResolvers<any, Context> = {
    Layer: {
        __resolveType: (object: Layer) => (object.type === 'FRAGMENT' ? 'FragmentLayer' : 'CircuitLayer')
    },
    Query: {
        me: withUserAuthorization(async (parent, args, context) => {
            return await context.db.profile.findUnique({
                where: { id: context.profile.id },
                include: {
                    projects: { include: { likes: true, layers: true, owner: true } },
                    subscription: true,
                    following: { include: { targetProfile: true } },
                    followers: { include: { targetProfile: true } }
                }
            });
        }),
        profile: async (parent, args, context) => {
            return await context.db.profile.findFirst({
                where: { OR: [{ id: args.id }, { username: args.username }] },
                include: {
                    projects: { include: { likes: true, layers: true, owner: true } },
                    following: { include: { targetProfile: true } },
                    followers: { include: { targetProfile: true } }
                }
            });
        },
        project: async (parent, args, context) => {
            return await context.db.project.findUnique({
                where: { id: args.id, visibility: 'PUBLIC' },
                include: { owner: true, likes: true, comments: { include: { profile: true } }, layers: true }
            });
        },
        projects: async (parent, args, context) => {
            return await context.db.project.findMany({
                where: { ownerId: args.profileId, visibility: 'PUBLIC' },
                include: { owner: true, likes: true, comments: { include: { profile: true } }, layers: true }
            });
        },
        layer: withUserAuthorization(async (parent, args, context) => {
            return await context.db.layer.findFirst({
                where: {
                    OR: [
                        { id: args.id, project: { visibility: 'PUBLIC' } },
                        { id: args.id, project: { ownerId: context.profile.id } }
                    ]
                }
            });
        }),
        searchProfiles: async (parent, args, context) => {
            return await context.db.profile.findMany({
                take: args.limit,
                orderBy: {
                    _relevance: {
                        fields: ['username'],
                        search: args.query,
                        sort: 'asc'
                    }
                }
            });
        },
        searchProjects: async (parent, args, context) => {
            return await context.db.project.findMany({
                where: {
                    visibility: 'PUBLIC'
                },
                take: args.limit,
                orderBy: {
                    _relevance: {
                        fields: ['name'],
                        search: args.query,
                        sort: 'asc'
                    }
                },
                include: { owner: true }
            });
        }
    },
    Mutation: {
        updateProfile: withUserAuthorization(async (parent, args, context) => {
            return await context.db.profile.update({
                where: { id: context.profile?.id },
                data: args
            });
        }),
        followProfile: withUserAuthorization(async (parent, args, context) => {
            if (context.profile.id === args.id) {
                return new ApolloError({
                    errorMessage: 'Target profile can not be the same as the authenticated profile'
                });
            }

            return await context.db.relationship.create({
                data: {
                    profileId: context.profile.id,
                    targetProfileId: args.id
                },
                include: {
                    targetProfile: true
                }
            });
        }),
        unfollowProfile: withUserAuthorization(async (parent, args, context) => {
            if (context.profile.id === args.id) {
                return new ApolloError({
                    errorMessage: 'Target profile can not be the same as the authenticated profile'
                });
            }

            const relationship = await context.db.relationship.delete({
                where: {
                    profileId_targetProfileId: {
                        profileId: context.profile.id,
                        targetProfileId: args.id
                    }
                }
            });

            return !!relationship;
        }),
        createProject: withUserAuthorization(async (parent, args, context) => {
            return await context.db.project.create({
                data: {
                    name: 'Untitled',
                    ownerId: context.profile.id
                }
            });
        }),
        updateProject: withUserAuthorization(async (parent, { id, ...args }, context) => {
            return await context.db.project.update({
                where: { id, ownerId: context.profile.id },
                data: args
            });
        }),
        deleteProject: withUserAuthorization(async (parent, args, context) => {
            const project = await context.db.project.delete({
                where: { id: args.id, ownerId: context.profile.id }
            });

            return !!project;
        }),
        createLayer: withUserAuthorization(async (parent, args, context) => {
            const project = await context.db.project.findUnique({ where: { id: args.projectId } });

            if (project?.ownerId !== context.profile.id) {
                return new ApolloError({ errorMessage: 'User Authorization failed' });
            }

            return await context.db.layer.create({
                data: {
                    name: 'Untitled',
                    type: args.type,
                    index: args.index,
                    projectId: args.projectId,
                    [args.type === 'FRAGMENT' ? 'fragment' : 'circuit']:
                        args.type === 'FRAGMENT' ? args.fragment : args.circuit
                }
            });
        }),
        updateLayer: withUserAuthorization(async (parent, { id, projectId, ...args }, context) => {
            const project = await context.db.project.findUnique({ where: { id: projectId } });

            if (project?.ownerId !== context.profile.id) {
                return new ApolloError({ errorMessage: 'User Authorization failed' });
            }

            return await context.db.layer.update({
                where: {
                    id,
                    projectId,
                    project: {
                        ownerId: context.profile.id
                    }
                },
                data: args
            });
        }),
        deleteLayer: withUserAuthorization(async (parent, args, context) => {
            const layer = await context.db.layer.delete({
                where: { id: args.id, project: { ownerId: context.profile.id } }
            });

            return !!layer;
        })
    }
};
