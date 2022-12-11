import { Size } from '../../types';

export type AvatarSize = Extract<Size, Size.SM | Size.MD | Size.LG>;

export interface IAvatarProps {
    size: AvatarSize;
    media?: string;
}
