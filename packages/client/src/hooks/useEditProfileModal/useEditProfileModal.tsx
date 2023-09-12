import { useQuery } from '@apollo/client';
import { FaceOutlined, LinkOutlined, LocationOnOutlined, ShortTextOutlined } from '@mui/icons-material';
import { noop } from 'lodash';
import * as React from 'react';

import { ButtonVariant } from '../../components/Button/Button.types';
import { EDIT_PROFILE_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { ME_QUERY } from '~/apollo/queries';
import { Avatar } from '~/components/Avatar/Avatar';
import { Input } from '~/components/Input/Input';
import { Size } from '~/types';

export const EditProfileContent = () => {
    const { data = { me: undefined } } = useQuery(ME_QUERY);

    if (!data.me) return null;

    const { image, username, location, bio, website } = data.me;

    return (
        <div className="flex flex-col items-stretch w-full px-24">
            <Avatar className="self-center mt-6" size={Size.MD} source={image ?? undefined} />
            <p className="mt-8">Username</p>
            <Input
                className="text-xl mt-2"
                placeholder="Username"
                defaultValue={username}
                type="text"
                icon={FaceOutlined}
            />
            <p className="mt-4">Location</p>
            <Input
                className="text-xl mt-2"
                placeholder="Location"
                defaultValue={location || ''}
                type="text"
                icon={LocationOnOutlined}
            />
            <p className="mt-4">Bio</p>
            <Input
                className="text-xl mt-2"
                placeholder="Bio"
                defaultValue={bio || ''}
                type="text"
                icon={ShortTextOutlined}
            />
            <p className="mt-4">Website</p>
            <Input
                className="text-xl mt-2"
                placeholder="Website"
                defaultValue={website || ''}
                type="url"
                icon={LinkOutlined}
            />
        </div>
    );
};

export const useEditProfileModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(() => {
        modal.queue({
            id: EDIT_PROFILE_MODAL_ID,
            title: 'Edit Profile',
            children: <EditProfileContent />,
            actions: [
                { children: 'Save', disabled: true, onClick: noop },
                {
                    children: 'Cancel',
                    variant: ButtonVariant.TERTIARY,
                    onClick: () => {
                        modal.close(EDIT_PROFILE_MODAL_ID);
                    }
                }
            ]
        });
    }, [modal]);

    return {
        open,
        close: modal.close
    };
};
