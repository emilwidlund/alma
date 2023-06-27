'use client';

import { LayerSchema } from '@/../types/build';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PrismaClient } from '@prisma/client';

import { OwnerSchema, ProfileSchema } from '~/models/Profile/Profile';
import { ProjectSchema } from '~/models/Project/Project';
import Profile from '../profile';
import { ProfileProps } from '../profile/index.types';

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient(ctx);
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession();

    const username =
        typeof ctx.params === 'object' && typeof ctx.params['username'] === 'string'
            ? ctx.params['username']
            : undefined;

    const prisma = new PrismaClient();
    const profile = await prisma.profile.findUnique({
        where: { username },
        include: { projects: { where: { private: false }, include: { owner: true, layers: true } } }
    });

    if (!session || !profile) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return {
        props: {
            initialSession: session,
            profile: ProfileSchema.parse({
                ...profile,
                createdAt: profile.createdAt.toJSON(),
                updatedAt: profile.updatedAt.toJSON()
            }),
            projects: profile.projects.map(project =>
                ProjectSchema.parse({
                    id: project.id,
                    name: project.name,
                    private: project.private,
                    image: project.image,
                    owner: OwnerSchema.parse({
                        ...project.owner,
                        createdAt: project.owner.createdAt.toJSON(),
                        updatedAt: project.owner.updatedAt.toJSON()
                    }),
                    layers: project.layers.map(layer =>
                        LayerSchema.parse({
                            id: layer.id,
                            name: layer.name,
                            type: layer.type,
                            context: layer.type === 'CIRCUIT' ? JSON.stringify(layer.circuit) : layer.fragment,
                            enabled: layer.enabled,
                            blendingMode: layer.blendingMode
                        })
                    ),
                    createdAt: project.createdAt.toJSON(),
                    updatedAt: project.updatedAt.toJSON()
                })
            )
        }
    };
};

export default Profile;
