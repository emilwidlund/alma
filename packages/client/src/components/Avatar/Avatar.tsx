import { AvatarProps } from './Avatar.types';
import { Size } from '../../types';

export const Avatar = ({ size = Size.SM, source = '' }: AvatarProps) => {
    return (
        <div
            className="w-10 h-10 shrink-0 rounded-full bg-cover bg-center border-2 border-neutral-100"
            style={{ backgroundImage: `url(${source})` }}
        />
    );
};
