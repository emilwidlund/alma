import { useQuery } from '@apollo/client';
import * as React from 'react';

import { Query } from '../../../generated/graphql';
import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { Scene } from '../../components/Scene/Scene';
import { SceneContent } from '../../components/Scene/SceneContent';
import { ProjectsGrid } from '../../containers/ProjectsGrid/ProjectsGrid';
import { Size } from '../../types';
import {
    dashboardHeaderContentStyles,
    dashboardHeaderFollwersStyles,
    dashboardHeaderIdentityStyles,
    dashboardHeaderMetaStyles,
    dashboardHeaderWrapperStyles,
    dashboardWrapperStyles
} from './DashboardRoute.styles';

export const DashboardRoute = () => {
    const { data, loading } = useQuery<Query>(PROFILE_QUERY, {
        variables: { userId: 'clbl6axp80000p13d361e0eis' }
    });

    if (loading || !data?.getUser || !data?.getProjects) {
        return null;
    }

    return (
        <Scene>
            <SceneContent>
                <div className={dashboardWrapperStyles}>
                    <div className={dashboardHeaderWrapperStyles}>
                        <div className={dashboardHeaderContentStyles}>
                            <Avatar size={Size.LG} media={data.getUser.mediaUrl} />
                            <div className={dashboardHeaderIdentityStyles}>
                                <Heading size={Size.MD} marginTop={0} marginBottom={16}>
                                    {data.getUser.name}
                                </Heading>
                                <div className={dashboardHeaderMetaStyles}>
                                    <span>@{data.getUser.username}</span>
                                    <div className={dashboardHeaderFollwersStyles}>
                                        <Icon name="face" size={20} />
                                        <span>287 followers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button label="Follow" />
                        </div>
                    </div>
                    <ProjectsGrid items={data.getProjects} />
                </div>
            </SceneContent>
        </Scene>
    );
};
