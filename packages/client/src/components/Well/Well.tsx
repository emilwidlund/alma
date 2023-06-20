import clsx from 'clsx';
import { WellProps } from './Well.types';

export const Well = ({ children, className }: WellProps) => {
    const classNames = clsx('p-3 bg-neutral-200 rounded-3xl', className);
    return <div className={classNames}>{children}</div>;
};
