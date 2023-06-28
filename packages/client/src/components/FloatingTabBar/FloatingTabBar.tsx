'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';

import { FloatingTabBarProps, TabItemProps } from './FloatingTabBar.types';

const TabItem = ({ path, icon, active }: TabItemProps) => {
    const classNames = clsx(
        'flex items-center justify-center p-2 rounded-xl first:mt-0 mt-4 w-10 h-10 transition-colors',
        {
            'bg-accent': active,
            'text-white': active,
            'shadow-md shadow-accent': active,
            'hover:bg-neutral-300': !active,
            'opacity-100': active,
            'opacity-30': !active
        }
    );

    return (
        <Link href={path} className={classNames}>
            {cloneElement(icon, { fontSize: 'small' })}
        </Link>
    );
};

export const FloatingTabBar = ({ items }: FloatingTabBarProps) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col p-3 bg-neutral-100 shadow-xl rounded-2xl">
            {items.map(props => (
                <TabItem {...props} active={pathname === props.path} key={props.name} />
            ))}
        </div>
    );
};
