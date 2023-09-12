'use client';

import { useQuery } from '@apollo/client';
import { Profile } from '@usealma/types';
import { useRouter } from 'next/router';

import { PROFILE_QUERY } from '~/apollo/queries';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { Spinner } from '~/components/Spinner/Spinner';
import { ProfileContainer } from '~/containers/ProfileContainer/ProfileContainer';

export default function Profile() {
    const router = useRouter();

    const { data: { profile: profileData } = { me: undefined } } = useQuery(PROFILE_QUERY, {
        variables: { username: router.query.username }
    });

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />
            <section className="flex flex-row flex-nowrap items-start justify-between mt-8 gap-x-12">
                {profileData && <ProfileContainer {...profileData} profileId={profileData.id} loading={!profileData} />}
                {profileData ? (
                    <div className="flex flex-col w-full h-full">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-3xl font-medium">Projects</h2>
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
                                <h4 className="font-medium text-lg">No projects to be found</h4>
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
