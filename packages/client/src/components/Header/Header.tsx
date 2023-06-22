'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useCallback } from 'react';

import { HeaderNavigationLinkProps } from './Header.types';
import { Avatar } from '../Avatar/Avatar';

export default function Header() {
    const { data, status } = useSession();

    const handleSignIn = useCallback(() => {
        if (status === 'unauthenticated') {
            signIn('google');
        }
    }, [status]);

    return (
        <header className="relative flex justify-between items-center w-full py-12">
            <Link className="text-2xl z-10" href="/profile">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            <div className="absolute z-0 flex items-center justify-center w-full">
                <HeaderNavigationLink href="/">Index</HeaderNavigationLink>
                <HeaderNavigationLink href="/community">Community</HeaderNavigationLink>
                <HeaderNavigationLink href="/pricing">Pricing</HeaderNavigationLink>
                <HeaderNavigationLink href="/docs">Docs</HeaderNavigationLink>
            </div>
            <div className="z-10">
                {status === 'authenticated' && data.user && (
                    <Link href="/profile">
                        <Avatar source={data?.user.image || ''} />
                    </Link>
                )}
                {status === 'unauthenticated' && <a onClick={handleSignIn}>Sign In</a>}
            </div>
        </header>
    );
}

export const HeaderNavigationLink = (props: HeaderNavigationLinkProps) => {
    const pathname = usePathname();

    const classNames = clsx('mx-6 font-medium transition-opacity', {
        'opacity-50': pathname !== props.href,
        'hover:opacity-100': pathname !== props.href
    });

    return <Link {...props} className={classNames} />;
};
