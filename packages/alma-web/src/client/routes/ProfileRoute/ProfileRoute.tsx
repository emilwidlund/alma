import { useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Query } from '../../../generated/graphql';
import FOLLOW_MUTATION from '../../apollo/mutations/follow.gql';
import UNFOLLOW_MUTATION from '../../apollo/mutations/unfollow.gql';
import ME_QUERY from '../../apollo/queries/me.gql';
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
import { useCreateProjectModal } from '../../hooks/useCreateProjectModal/useCreateProjectModal';
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
    const { open: openCreateProjectModal } = useCreateProjectModal();
    const { data: meData, loading: meLoading } = useQuery<Query>(ME_QUERY, {
        variables: { username }
    });
    const { data: profileData, loading: profileLoading } = useQuery<Query>(PROFILE_QUERY, {
        variables: { username }
    });
    const [follow, { loading: followLoading }] = useMutation<Query>(FOLLOW_MUTATION, {
        refetchQueries: [PROFILE_QUERY]
    });
    const [unfollow, { loading: unfollowLoading }] = useMutation<Query>(UNFOLLOW_MUTATION, {
        refetchQueries: [PROFILE_QUERY]
    });

    const loading = meLoading || profileLoading || followLoading || unfollowLoading;

    if (!profileData?.getUser || !meData?.me) {
        return null;
    }

    return (
        <Scene>
            <SceneContent>
                <NavBar />
                <div className={profileWrapperStyles}>
                    <div className={profileHeaderWrapperStyles}>
                        <div className={profileHeaderContentStyles}>
                            <Avatar size={Size.LG} media={profileData.getUser.mediaUrl} />
                            <div className={profileHeaderIdentityStyles}>
                                <Heading size={Size.MD} marginTop={0} marginBottom={16}>
                                    {profileData.getUser.name}
                                </Heading>
                                <div className={profileHeaderMetaStyles}>
                                    <span>@{profileData.getUser.username}</span>
                                    <div className={profileHeaderFollwersStyles}>
                                        <Icon name="groups" size={20} />
                                        <span>
                                            {profileData.getUser.followersCount}
                                            {profileData.getUser.followersCount === 1 ? ' follower' : ' followers'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {meData.me.id === profileData.getUser.id ? (
                                <Button icon="add" label="New Project" onPress={openCreateProjectModal} />
                            ) : (
                                <Button
                                    label={profileData.getUser.isFollowedByMe ? 'Unfollow' : 'Follow'}
                                    variant={
                                        profileData.getUser.isFollowedByMe
                                            ? ButtonVariant.SECONDARY
                                            : ButtonVariant.PRIMARY
                                    }
                                    loading={loading}
                                    onPress={() => {
                                        if (profileData.getUser?.isFollowedByMe) {
                                            unfollow({ variables: { targetUserId: profileData.getUser.id } });
                                        } else {
                                            follow({ variables: { targetUserId: profileData.getUser?.id } });
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <ProjectsGrid items={profileData.getUser.projects} />
                </div>
            </SceneContent>
        </Scene>
    );
};
