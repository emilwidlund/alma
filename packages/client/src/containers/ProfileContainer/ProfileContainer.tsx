import * as React from 'react';

import { ProfileContainerProps } from './ProfileContainer.types';

import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { Spinner } from '~/components/Spinner/Spinner';
import { useRelationshipAction } from '~/hooks/useRelationshipAction/useRelationshipAction';
import { Size } from '~/types';
import { prettifyURL } from '~/utils/urls/urls';

export const ProfileContainer = ({
    username,
    profileId,
    image,
    bio,
    location,
    website,
    loading
}: ProfileContainerProps) => {
    const relationshipAction = useRelationshipAction(profileId);

    return (
        <div className="relative">
            {loading ? (
                <div className="sticky flex flex-col items-center justify-center text-center bg-neutral-700 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80 h-96">
                    <Spinner />
                </div>
            ) : (
                <div className="sticky flex flex-col items-center text-center bg-neutral-700 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80">
                    <Avatar size={Size.MD} source={image ?? undefined} />
                    <h3 className="text-xl mt-8 font-medium">{username}</h3>
                    {location && <span className="mt-1 text-sm opacity-50">{location}</span>}
                    {bio && <span className="mt-6 text-sm">{bio}</span>}
                    {website && (
                        <a className="mt-2 text-sm text-accent" href={website}>
                            {prettifyURL(website)}
                        </a>
                    )}
                    {relationshipAction && <Button className="w-full justify-center mt-12" {...relationshipAction} />}
                </div>
            )}
        </div>
    );
};
