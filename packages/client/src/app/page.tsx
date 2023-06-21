'use client';

import { FullscreenOutlined, MemoryOutlined, StreamOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Banner } from '~/components/Banner/Banner';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';

const DEFAULT_FRAGMENT = `void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = v_uv;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

export default function Editor() {
    const [fragmentSource, setFragmentSource] = useState<string | undefined>(DEFAULT_FRAGMENT);
    const [compilationError, setCompilationError] = useState<string | undefined>();

    const mainContainerClassNames = clsx(
        'absolute top-32 right-48 bottom-32 left-48 rounded-3xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2 border-transparent',
        {
            'border-red-400': !!compilationError
        }
    );

    return (
        <main className="flex flex-row h-screen text-text-dark bg-neutral-200">
            <div className="flex flex-col flex-grow">
                <header className="relative flex flex-row items-center justify-between p-12 pb-0">
                    <Image className="z-10" src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
                    <div className="absolute w-full flex flex-col items-center mx-auto">
                        <h2 className="text-lg font-medium">My Gradient Project</h2>
                        <span className="text-sm mt-1 opacity-50">Private</span>
                    </div>
                    <Link className="z-10" href="/emilwidlund">
                        <Avatar source="https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-1/291779431_10160335426211204_1185442693033806086_n.jpg?stp=c0.27.160.160a_cp1_dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=irP1iIeiAesAX_M0Hz9&_nc_oc=AQnivDyGmObEHFrNlxz5VTXNc9XCi4qpj8QQPQ18KmoEXT_S8Ha2tCHtDleRU7o_CCs&_nc_ht=scontent-arn2-1.xx&oh=00_AfAKzia4JpZRZQ9KxkLuLBhwlghANSb6qBX4WcpigqxTIA&oe=649881C1" />
                    </Link>
                </header>
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

                                    setFragmentSource(value);
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
