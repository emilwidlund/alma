import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { Size } from '../../types';

export type AvatarSize = Extract<Size, Size.SM | Size.MD | Size.LG>;

export type AvatarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    source?: string;
    size?: AvatarSize;
};
