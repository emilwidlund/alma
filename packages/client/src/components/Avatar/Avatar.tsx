import { clsx } from 'clsx';

import { AvatarProps } from './Avatar.types';
import { Size } from '../../types';

export const Avatar = ({ size = Size.SM, source = '', className, ...props }: AvatarProps) => {
    const classNames = clsx(
        'shrink-0 rounded-full bg-cover bg-center',
        {
            'w-10 h-10': size === Size.SM,
            'w-24 h-24': size === Size.MD,
            'w-48 h-48': size === Size.LG
        },
        className
    );

    return <div className={classNames} style={{ backgroundImage: `url(${source})` }} {...props} />;
};
