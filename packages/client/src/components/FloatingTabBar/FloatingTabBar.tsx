'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';

import { FloatingTabBarProps, TabItemProps } from './FloatingTabBar.types';

const TabItem = ({ path, icon, active }: TabItemProps) => {
    const classNames = clsx(
        'flex items-center justify-center p-2 rounded-xl first:mt-0 mt-4 w-10 h-10 transition-colors hover:text-slate-300',
        {
            'bg-accent': active,
            'text-slate-200': active,
            'shadow-xl': active,
            'text-neutral-200': !active,
            'hover:bg-neutral-400': !active
        }
    );

    return (
        <Link href={path} className={classNames}>
            {cloneElement(icon, { fontSize: 'inherit' })}
        </Link>
    );
};

export const FloatingTabBar = ({ items }: FloatingTabBarProps) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col p-3 bg-neutral-600 shadow-xl rounded-2xl">
            {items.map(props => (
                <TabItem {...props} active={pathname === props.path} key={props.name} />
            ))}
        </div>
    );
};
