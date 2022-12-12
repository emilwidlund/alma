import { css } from '@emotion/css';

import { Size } from '../../types';
import { AvatarSize } from './Avatar.types';

const getAvatarSize = (size: AvatarSize): number => {
    switch (size) {
        case Size.LG:
            return 120;
        case Size.MD:
            return 80;
        default:
            return 40;
    }
};

export const avatarWrapperStyles = (size: AvatarSize, url?: string) => css`
    width: ${getAvatarSize(size)}px;
    height: ${getAvatarSize(size)}px;
    border-radius: ${getAvatarSize(size) / 2}px;
    background-color: rgba(0, 0, 0, 1);
    background-image: url(${url});
    background-position: center center;
    background-size: cover;
`;
