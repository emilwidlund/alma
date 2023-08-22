import { Project, ProjectSchema, Profile, ProfileSchema } from '@usealma/types';
import { useEffect, useState } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { Spinner } from '~/components/Spinner/Spinner';
import { Size } from '~/types';
import { prettifyURL } from '~/utils/urls/urls';

export default function Profile() {
    const [profile, setProfile] = useState<Profile>();
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        fetch(`/api/profile/me`)
            .then(v => v.json())
            .then(profile => {
                ProfileSchema.parse(profile) ? setProfile(profile) : undefined;
            });

        fetch(`/api/projects/me`)
            .then(v => v.json())
            .then(projects =>
                projects.map((project: Project) => ProjectSchema.parse(project)) ? setProjects(projects) : undefined
            );
    }, []);

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />
            <section className="flex flex-row items-start justify-between mt-8">
                <div className="relative">
                    {profile ? (
                        <div className="sticky flex flex-col items-center text-center bg-neutral-100 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80">
                            <Avatar size={Size.MD} source={profile.image} />
                            <h3 className="text-xl mt-8 font-medium">{profile.username}</h3>
                            <span className="mt-1 text-sm opacity-50">{profile.location}</span>
                            <span className="mt-6 text-sm">{profile.bio}</span>
                            <a className="mt-2 text-sm text-accent" href={profile.website}>
                                {prettifyURL(profile?.website ?? '')}
                            </a>
                            <Button className="w-full justify-center mt-12">Follow</Button>
                        </div>
                    ) : (
                        <div className="sticky flex flex-col items-center justify-center text-center bg-neutral-100 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80 h-96">
                            <Spinner />
                        </div>
                    )}
                </div>
                {projects ? (
                    <div className="relative grid grid-cols-3 gap-6">
                        {projects.map(project => (
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
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <Spinner />
                    </div>
                )}
            </section>
        </main>
    );
}
