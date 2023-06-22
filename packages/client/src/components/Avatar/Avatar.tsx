import clsx from 'clsx';

import { AvatarProps } from './Avatar.types';
import { Size } from '../../types';

export const Avatar = ({ size = Size.SM, source = '' }: AvatarProps) => {
    const classNames = clsx('shrink-0 rounded-full bg-cover bg-center border-2 border-white', {
        'w-10 h-10': size === Size.SM,
        'w-24 h-24': size === Size.MD,
        'w-48 h-48': size === Size.LG
    });

    const croppedSource = source.replace('s96-c', 's256-c');

    return <div className={classNames} style={{ backgroundImage: `url(${croppedSource})` }} />;
};
