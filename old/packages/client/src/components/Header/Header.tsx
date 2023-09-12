import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HeaderNavigationLinkProps } from './Header.types';
import { Avatar } from '../Avatar/Avatar';
import { Database } from '@/lib/database.types';
import { Size } from '~/types';

const supabase = createClientComponentClient<Database>();

async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
    });
}

global.signInWithGitHub = signInWithGitHub;

export default function Header() {
    const session = useSession();
    const authSection = session ? (
        <Link href="/profile">
            <Avatar size={Size.SM} source={session.user.user_metadata.avatar_url} />
        </Link>
    ) : (
        <button onClick={signInWithGitHub}>Login</button>
    );

    return (
        <header className="relative flex justify-between items-center w-full py-12">
            <Link className="text-2xl z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            <div className="absolute z-0 flex items-center justify-center w-full">
                <HeaderNavigationLink href="/">Index</HeaderNavigationLink>
                <HeaderNavigationLink href="/learn">Learn</HeaderNavigationLink>
                <HeaderNavigationLink href="/community">Community</HeaderNavigationLink>
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
