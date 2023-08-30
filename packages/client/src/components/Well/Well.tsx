import { clsx } from 'clsx';

import { WellProps } from './Well.types';

export const Well = ({ children, className }: WellProps) => {
    const classNames = clsx('p-3 bg-neutral-800 rounded-3xl overflow-y-auto h-full', className);
    return <div className={classNames}>{children}</div>;
};
