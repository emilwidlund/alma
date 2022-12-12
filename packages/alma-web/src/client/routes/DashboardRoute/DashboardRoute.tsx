import { useQuery } from '@apollo/client';
import * as React from 'react';

import { Query } from '../../../generated/graphql';
import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Heading } from '../../components/Heading/Heading';
import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { SceneContent } from '../../components/Scene/SceneContent';
import { ProjectsGrid } from '../../containers/ProjectsGrid/ProjectsGrid';
import { Size } from '../../types';
import { dashboardHeaderIdentityStyles, dashboardHeaderWrapperStyles } from './DashboardRoute.styles';

export const DashboardRoute = () => {
    const { data, loading } = useQuery<Query>(PROFILE_QUERY, {
        variables: { userId: 'clbiempla0000wwszwq301dbf' }
    });

    if (loading || !data?.getUser || !data?.getProjects) {
        return null;
    }

    return (
        <Scene>
            <SceneContent>
                <NavBar>
                    <NavBarItem to="/explore" children="Explore" />
                    <NavBarItem to="/dashboard" children="Dashboard" />
                </NavBar>
                <div className={dashboardHeaderWrapperStyles}>
                    <Avatar size={Size.LG} media={data.getUser.mediaUrl} />
                    <div className={dashboardHeaderIdentityStyles}>
                        <Heading size={Size.MD} marginTop={0} marginBottom={16}>
                            {data.getUser.name}
                        </Heading>
                        <span>@{data.getUser.username}</span>
                    </div>
                </div>
                <ProjectsGrid items={data.getProjects} />
            </SceneContent>
        </Scene>
    );
};
