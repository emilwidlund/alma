import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { HeaderNavigationLinkProps } from './Header.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import Script from 'next/script';
import { useSession } from '@supabase/auth-helpers-react';
import { Avatar } from '../Avatar/Avatar';
import { Size } from '~/types';

const supabase = createClientComponentClient<Database>();
async function handleSignInWithGoogle({ credential }: { credential: string }) {
    const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credential
    });

    console.log(data);
}

global.handleSignInWithGoogle = handleSignInWithGoogle;

export default function Header() {
    const session = useSession();
    const authSection = session ? (
        <Link href="/profile">
            <Avatar size={Size.SM} source={session.user.user_metadata.picture} />
        </Link>
    ) : (
        <>
            <Script src="https://accounts.google.com/gsi/client" async defer></Script>
            <div
                id="g_id_onload"
                data-client_id="86219534501-b0qri9b7168frrlispegvsarkmt5gmm6.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleSignInWithGoogle"
                data-auto_select="true"
                data-itp_support="true"
            ></div>
            <div
                className="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
            ></div>
        </>
    );

    return (
        <header className="relative flex justify-between items-center w-full py-12">
            <Link className="text-2xl z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            <div className="absolute z-0 flex items-center justify-center w-full">
                <HeaderNavigationLink href="/">Index</HeaderNavigationLink>
                <HeaderNavigationLink href="/community">Community</HeaderNavigationLink>
                <HeaderNavigationLink href="/docs">Docs</HeaderNavigationLink>
            </div>
            <div className="z-10">{authSection}</div>
        </header>
    );
}

export const HeaderNavigationLink = (props: HeaderNavigationLinkProps) => {
    const pathname = usePathname();

    const classNames = clsx('mx-8 font-medium transition-opacity', {
        'opacity-50': pathname !== props.href,
        'hover:opacity-100': pathname !== props.href
    });

    return <Link {...props} className={classNames} />;
};
