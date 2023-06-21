import { Size } from '../../types';

export type AvatarSize = Extract<Size, Size.SM | Size.MD | Size.LG>;

export type AvatarProps = {
    source?: string;
    size?: AvatarSize;
};
