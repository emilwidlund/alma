import * as React from 'react';

import { avatarWrapperStyles } from './Avatar.styles';
import { IAvatarProps } from './Avatar.types';

export const Avatar = ({ size, media }: IAvatarProps) => {
    return <div className={avatarWrapperStyles(size, media)} />;
};
