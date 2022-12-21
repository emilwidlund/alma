import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';

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
    profileHeaderContentStyles,
    profileHeaderFollwersStyles,
    profileHeaderIdentityStyles,
    profileHeaderMetaStyles,
    profileHeaderWrapperStyles,
    profileWrapperStyles
} from './ProfileRoute.styles';

export const ProfileRoute = () => {
    const { username } = useParams();
    const { data, loading } = useQuery<Query>(PROFILE_QUERY, {
        variables: { username }
    });

    if (loading || !data?.getUser) {
        return null;
    }

    return (
        <Scene>
            <SceneContent>
                <div className={profileWrapperStyles}>
                    <div className={profileHeaderWrapperStyles}>
                        <div className={profileHeaderContentStyles}>
                            <Avatar size={Size.LG} media={data.getUser.mediaUrl} />
                            <div className={profileHeaderIdentityStyles}>
                                <Heading size={Size.MD} marginTop={0} marginBottom={16}>
                                    {data.getUser.name}
                                </Heading>
                                <div className={profileHeaderMetaStyles}>
                                    <span>@{data.getUser.username}</span>
                                    <div className={profileHeaderFollwersStyles}>
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
                    <ProjectsGrid items={data.getUser.projects} />
                </div>
            </SceneContent>
        </Scene>
    );
};
