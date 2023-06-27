import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PrismaClient } from '@prisma/client';

import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { Size } from '~/types';
import { ProfileProps } from './index.types';
import { prettifyURL } from '~/utils';
import { OwnerSchema, ProfileSchema } from '~/models/Profile/Profile';
import { LayerSchema } from '@/../types/build';
import { ProjectSchema } from '~/models/Project/Project';

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient(ctx);
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession();

    const prisma = new PrismaClient();
    const profile = await prisma.profile.findUnique({
        where: { userId: session?.user.id },
        include: { projects: { include: { owner: true, layers: true } } }
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
                    image: project.image,
                    private: project.private,
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

export default function Profile({ profile, projects }: ProfileProps) {
    const session = useSession();

    if (!session) {
        return null;
    }

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />
            <section className="flex flex-row items-start justify-between mt-8">
                <div className="relative">
                    <div className="sticky flex flex-col items-center text-center bg-neutral-100 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80">
                        <Avatar size={Size.MD} source={session.user.user_metadata.picture} />
                        <h3 className="text-xl mt-8 font-medium">{profile.username}</h3>
                        <span className="mt-1 text-sm opacity-50">{profile.location}</span>
                        <span className="mt-6 text-sm">{profile.bio}</span>
                        <a className="mt-2 text-sm text-accent" href={profile.website}>
                            {prettifyURL(profile.website)}
                        </a>
                        <Button className="w-full justify-center mt-12">Follow</Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            projectId={project.id}
                            name={project.name}
                            author={{ username: 'emilwidlund', image: '' }}
                            image={project.image}
                            layers={project.layers}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
