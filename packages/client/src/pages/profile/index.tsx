'use client';

import { useQuery } from '@apollo/client';
import { AddOutlined } from '@mui/icons-material';
import { Profile } from '@usealma/types';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import ME_QUERY from '~/apollo/queries/me.gql';
import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { IconButton } from '~/components/IconButton/IconButton';
import { Spinner } from '~/components/Spinner/Spinner';
import { Size } from '~/types';
import { prettifyURL } from '~/utils/urls/urls';

export default function Profile() {
    const router = useRouter();

    const { data: { me: profileData } = { me: undefined } } = useQuery(ME_QUERY);

    const handleNewProject = useCallback(() => {
        router.push('/new');
    }, [router]);

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />
            <section className="flex flex-row flex-nowrap items-start justify-between mt-8 gap-x-12">
                <div className="relative">
                    {profileData ? (
                        <div className="sticky flex flex-col items-center text-center bg-neutral-100 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80">
                            <Avatar size={Size.MD} source={profileData.image ?? undefined} />
                            <h3 className="text-xl mt-8 font-medium">{profileData.username}</h3>
                            <span className="mt-1 text-sm opacity-50">{profileData.location}</span>
                            <span className="mt-6 text-sm">{profileData.bio}</span>
                            {profileData.website && (
                                <a className="mt-2 text-sm text-accent" href={profileData.website}>
                                    {prettifyURL(profileData.website)}
                                </a>
                            )}
                            <Button className="w-full justify-center mt-12">Follow</Button>
                        </div>
                    ) : (
                        <div className="sticky flex flex-col items-center justify-center text-center bg-neutral-100 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80 h-96">
                            <Spinner />
                        </div>
                    )}
                </div>
                {profileData ? (
                    <div className="flex flex-col w-full h-full">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-3xl font-medium">Projects</h2>
                            <IconButton icon={<AddOutlined />} onClick={handleNewProject}>
                                New Project
                            </IconButton>
                        </div>
                        {profileData.projects?.length ? (
                            <div className="relative grid grid-cols-3 gap-6 mt-12">
                                {profileData.projects.map(project => (
                                    <ProjectCard
                                        key={project.id}
                                        projectId={project.id}
                                        name={project.name}
                                        author={project.owner}
                                        image={project.image}
                                        layers={project.layers}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <h4 className="font-medium text-lg">You have no projects</h4>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <Spinner />
                    </div>
                )}
            </section>
        </main>
    );
}
