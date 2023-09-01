'use client';

import { useQuery } from '@apollo/client';
import { useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';

import { graphql } from '~/apollo/generated';
import { ProjectVisibility } from '~/apollo/generated/graphql';
import { Avatar } from '~/components/Avatar/Avatar';
import { useProject } from '~/providers/ProjectProvider/ProjectProvider';
import { Size } from '~/types';

const editorHeaderQuery = graphql(`
    query EditorHeaderQuery($id: ID!) {
        project(id: $id) {
            id
            name
            visibility
        }
    }
`);

export const EditorHeader = () => {
    const session = useSession();
    const { projectId } = useProject();

    const { data: { project } = { project: undefined } } = useQuery(editorHeaderQuery, {
        variables: { id: projectId }
    });

    if (!project) return null;

    return (
        <header className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between p-12 pb-0">
            <Link className="z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            <div className="absolute w-full flex flex-col items-center mx-auto">
                <h2 className="text-lg font-medium">{project.name}</h2>
                <span className="text-sm mt-1 opacity-50">
                    {project.visibility === ProjectVisibility.Private ? 'Private' : 'Public'}
                </span>
            </div>
            {session && (
                <div className="z-10">
                    <Link href="/profile">
                        <Avatar size={Size.SM} source={session.user.user_metadata.picture} />
                    </Link>
                </div>
            )}
        </header>
    );
};
