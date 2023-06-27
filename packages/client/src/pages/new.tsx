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

const DEFAULT_FRAGMENT_2 = `#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a)
{
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}


// Created by inigo quilez - iq/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
vec2 hash( vec2 p )
{
    p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
	return fract(sin(p)*43758.5453);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
	return 0.5 + 0.5*n;
}


void main()
{
    float ratio = uResolution.x / uResolution.y;
    vec2 tuv = vUv;
    tuv -= .5;

    // rotate with Noise
    float degree = noise(vec2(uTime*.1, tuv.x*tuv.y));

    tuv.y *= 1./ratio;
    tuv *= Rot(radians((degree-.5)*720.+180.));
	tuv.y *= ratio;

    
    // Wave warp with sin
    float frequency = 5.;
    float amplitude = 30.;
    float speed = uTime * 2.;
    tuv.x += sin(tuv.y*frequency+speed)/amplitude;
   	tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
    
    
    // draw the image
    vec3 colorYellow = vec3(.957, .804, .623);
    vec3 colorDeepBlue = vec3(.192, .384, .933);
    vec3 layer1 = mix(colorYellow, colorDeepBlue, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
    
    vec3 colorRed = vec3(.910, .510, .8);
    vec3 colorBlue = vec3(0.350, .71, .953);
    vec3 layer2 = mix(colorRed, colorBlue, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
    
    vec3 finalComp = mix(layer1, layer2, S(.5, -.3, tuv.y));
    
    vec3 col = finalComp;
    
    fragColor = vec4(col,1.0);
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
    const [fragmentSource, setFragmentSource] = useState<string>(
        Math.random() > 0.5 ? DEFAULT_FRAGMENT : DEFAULT_FRAGMENT_2
    );
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
    return <EditorContainer />;
}
