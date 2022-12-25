import { useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Query } from '../../../generated/graphql';
import FOLLOW_MUTATION from '../../apollo/mutations/follow.gql';
import UNFOLLOW_MUTATION from '../../apollo/mutations/unfollow.gql';
import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { ButtonVariant } from '../../components/Button/Button.types';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { NavBar } from '../../components/NavBar/NavBar';
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
    const { data, loading: profileLoading } = useQuery<Query>(PROFILE_QUERY, {
        variables: { username }
    });
    const [follow, { loading: followLoading }] = useMutation<Query>(FOLLOW_MUTATION, {
        refetchQueries: [PROFILE_QUERY]
    });
    const [unfollow, { loading: unfollowLoading }] = useMutation<Query>(UNFOLLOW_MUTATION, {
        refetchQueries: [PROFILE_QUERY]
    });

    const loading = profileLoading || followLoading || unfollowLoading;

    if (!data?.getUser) {
        return null;
    }

    return (
        <Scene>
            <SceneContent>
                <NavBar />
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
                                        <Icon name="groups" size={20} />
                                        <span>
                                            {data.getUser.followersCount}
                                            {data.getUser.followersCount === 1 ? ' follower' : ' followers'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button
                                label={data.getUser.isFollowedByMe ? 'Unfollow' : 'Follow'}
                                variant={data.getUser.isFollowedByMe ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
                                loading={loading}
                                onPress={() => {
                                    if (data.getUser?.isFollowedByMe) {
                                        unfollow({ variables: { targetUserId: data.getUser.id } });
                                    } else {
                                        follow({ variables: { targetUserId: data.getUser?.id } });
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <ProjectsGrid items={data.getUser.projects} />
                </div>
            </SceneContent>
        </Scene>
    );
};
