'use client';

import { useQuery } from '@apollo/client';
import { AddOutlined } from '@mui/icons-material';
import { Profile } from '@usealma/types';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import ME_QUERY from '~/apollo/queries/me.gql';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { IconButton } from '~/components/IconButton/IconButton';
import { Spinner } from '~/components/Spinner/Spinner';
import { ProfileContainer } from '~/containers/ProfileContainer/ProfileContainer';

export default function Profile() {
    const router = useRouter();

    const { data: { me: profileData } = { me: undefined } } = useQuery(ME_QUERY);

    const handleNewProject = useCallback(() => {
        router.push('/new');
    }, [router]);

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />
            <section className="flex flex-row flex-nowrap items-start justify-between mt-8 gap-x-16">
                {profileData && <ProfileContainer {...profileData} profileId={profileData.id} loading={!profileData} />}
                {profileData ? (
                    <div className="flex flex-col w-full h-full">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="text-3xl font-medium">Projects</h3>
                            <IconButton icon={<AddOutlined />} onClick={handleNewProject}>
                                New Project
                            </IconButton>
                        </div>
                        {profileData.projects?.length ? (
                            <div className="relative grid grid-cols-3 gap-x-6 gap-y-10 mt-12">
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
