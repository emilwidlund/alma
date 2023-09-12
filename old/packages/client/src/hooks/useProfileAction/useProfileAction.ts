import { useMutation, useQuery } from '@apollo/client';

import { useEditProfileModal } from '../useEditProfileModal/useEditProfileModal';
import { FOLLOW_PROFILE_MUTATION, UNFOLLOW_PROFILE_MUTATION } from '~/apollo/mutations';
import { ME_QUERY } from '~/apollo/queries';
import { ButtonProps, ButtonVariant } from '~/components/Button/Button.types';

export const useProfileAction = (profileId: string): ButtonProps | undefined => {
    const { open: openEditProfileModal } = useEditProfileModal();
    const { data = { me: undefined } } = useQuery(ME_QUERY);
    const [followProfile] = useMutation(FOLLOW_PROFILE_MUTATION, {
        variables: {
            id: profileId
        },
        refetchQueries: [ME_QUERY]
    });
    const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE_MUTATION, {
        variables: {
            id: profileId
        },
        refetchQueries: [ME_QUERY]
    });

    if (!data.me) {
        return;
    }

    if (data.me.id === profileId) {
        return {
            children: 'Edit Profile',
            variant: ButtonVariant.SECONDARY,
            onClick: () => openEditProfileModal()
        };
    }

    if (data.me?.following?.find(relationship => relationship?.targetProfile.id === profileId)) {
        return {
            children: 'Unfollow',
            variant: ButtonVariant.SECONDARY,
            onClick: () => unfollowProfile()
        };
    }

    return {
        children: 'Follow',
        onClick: () => followProfile()
    };
};
