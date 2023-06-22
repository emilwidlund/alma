'use client';

import { FullscreenOutlined, MemoryOutlined, StreamOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Banner } from '~/components/Banner/Banner';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';

const DEFAULT_FRAGMENT = `void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

function EditorHeader() {
    const { data, status } = useSession();

    const handleSignIn = useCallback(() => {
        if (status === 'unauthenticated') {
            signIn('google');
        }
    }, [status]);

    return (
        <header className="relative flex flex-row items-center justify-between p-12 pb-0">
            <Link className="z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            <div className="absolute w-full flex flex-col items-center mx-auto">
                <h2 className="text-lg font-medium">My Gradient Project</h2>
                <span className="text-sm mt-1 opacity-50">Private</span>
            </div>
            <div className="z-10">
                {status === 'authenticated' && data.user && (
                    <Link href="/profile">
                        <Avatar source={data?.user.image || ''} />
                    </Link>
                )}
                {status === 'unauthenticated' && (
                    <a className="cursor-pointer" onClick={handleSignIn}>
                        Sign In
                    </a>
                )}
            </div>
        </header>
    );
}

function EditorContainer() {
    const [fragmentSource, setFragmentSource] = useState<string>(DEFAULT_FRAGMENT);
    const [compilationError, setCompilationError] = useState<string | undefined>();

    const mainContainerClassNames = clsx(
        'absolute top-32 right-32 bottom-32 left-32 rounded-3xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2',
        {
            'border-red-400': !!compilationError
        }
    );

    return (
        <main className="flex flex-row h-screen">
            <div className="flex flex-col flex-grow">
                <EditorHeader />
                <div className="flex flex-row flex-grow items-center">
                    <aside className="flex flex-col h-full items-center justify-start pl-12">
                        <div className="my-auto">
                            <FloatingTabBar
                                items={[
                                    { name: 'Edit', path: '/', icon: <MemoryOutlined /> },
                                    { name: 'Preview', path: '/preview', icon: <StreamOutlined /> },
                                    { name: 'Settings', path: '/settings', icon: <FullscreenOutlined /> }
                                ]}
                            />
                        </div>
                    </aside>
                    <main className="relative flex flex-col items-center justify-center grow w-full h-full">
                        <div className={mainContainerClassNames}>
                            <CodeEditor
                                value={fragmentSource}
                                onChange={value => {
                                    if (compilationError) {
                                        setCompilationError(undefined);
                                    }

                                    setFragmentSource(value || '');
                                }}
                            />
                        </div>
                        {compilationError && (
                            <div className="fixed bottom-8 mx-auto">
                                <Banner text={compilationError} />
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <PropertyPanel
                fragmentSource={fragmentSource}
                onFragmentCompilationError={() => {
                    setCompilationError('Fragment compilation failed.');
                }}
            />
        </main>
    );
}

export default function Editor() {
    return (
        <SessionProvider>
            <EditorContainer />
        </SessionProvider>
    );
}
