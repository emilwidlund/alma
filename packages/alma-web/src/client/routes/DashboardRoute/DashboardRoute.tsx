import { useQuery } from '@apollo/client';
import * as React from 'react';

import { Query } from '../../../generated/graphql';
import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Heading } from '../../components/Heading/Heading';
import { Scene } from '../../components/Scene/Scene';
import { ProjectsGrid } from '../../containers/ProjectsGrid/ProjectsGrid';
import { Size } from '../../types';

export const DashboardRoute = () => {
    const { data, loading } = useQuery<Query>(PROFILE_QUERY, {
        variables: { userId: 'clbiempla0000wwszwq301dbf' }
    });

    if (loading || !data?.getUser || !data?.getProjects) {
        return null;
    }

    return (
        <Scene>
            <h1>Dashboard</h1>
            <div>
                <Avatar size={Size.LG} media={data.getUser.mediaUrl} />
                <div>
                    <Heading size={Size.MD}>{data.getUser.name}</Heading>
                    <Heading size={Size.SM}>{data.getUser.username}</Heading>
                </div>
            </div>
            <ProjectsGrid items={data.getProjects} />
        </Scene>
    );
};
