'use client';

import { FullscreenOutlined, MemoryOutlined, StreamOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

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
    const [compilationError, setCompilationError] = useState(false);

    const mainContainerClassNames = clsx(
        'w-2/3 h-1/2 rounded-4xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2 border-transparent',
        {
            'border-red-300': compilationError
        }
    );

    return (
        <main className="flex items-center h-screen text-text-dark bg-neutral-200">
            <aside className="flex flex-col h-full items-center justify-start p-12">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
                <div className="my-auto">
                    <FloatingTabBar
                        items={[
                            { name: 'Preview', path: '/editor', icon: <StreamOutlined /> },
                            { name: 'Edit', path: '/', icon: <MemoryOutlined /> },
                            { name: 'Settings', path: '/', icon: <FullscreenOutlined /> }
                        ]}
                    />
                </div>
            </aside>
            <main className="flex flex-col items-center justify-center grow w-full h-full">
                <div className={mainContainerClassNames}>
                    <CodeEditor
                        value={fragmentSource}
                        onChange={value => {
                            if (compilationError) {
                                setCompilationError(false);
                            }

                            setFragmentSource(value);
                        }}
                    />
                </div>
            </main>
            <PropertyPanel
                fragmentSource={fragmentSource}
                onFragmentCompilationError={() => setCompilationError(true)}
            />
        </main>
    );
}
