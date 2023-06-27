'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { ProjectCard } from '~/components/Cards/ProjectCard/ProjectCard';
import Header from '~/components/Header/Header';
import { Size } from '~/types';

function ProfileContainer() {
    const { data, status } = useSession();

    useEffect(() => {
        fetch('/user/clj7sdejk00000g08d25n5hcj').then(async res => console.log(await res.json()));
    }, []);

    return (
        <main className="flex flex-col h-screen min-w-md max-w-7xl mx-auto">
            <Header />

            {status === 'authenticated' && data.user && (
                <section className="flex flex-row items-start justify-between mt-8">
                    <div className="relative">
                        <div className="sticky flex flex-col items-center text-center bg-neutral-100 shadow-xl px-8 pt-12 pb-8 rounded-4xl w-80">
                            <Avatar size={Size.MD} source={data?.user.image || ''} />
                            <h3 className="text-xl mt-8 font-medium">{data?.user?.name}</h3>
                            <span className="mt-1 text-sm opacity-50">Stockholm, Sweden</span>
                            <span className="mt-6 text-sm">Design Technologist · Code at EA</span>
                            <a className="mt-2 text-sm text-accent" href="https://emilwidlund.com">
                                https://emilwidlund.com
                            </a>
                            <Button className="w-full justify-center mt-12">Follow</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <ProjectCard
                            name="Flow Gradient"
                            projectId="123"
                            author={{ username: 'emilwidlund', image: '' }}
                            preview="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                            layers={[
                                {
                                    id: '123',
                                    name: 'Test',
                                    context: `#define S(a,b,t) smoothstep(a,b,t)

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
                                    }`,
                                    enabled: true,
                                    blendingMode: 'NORMAL'
                                }
                            ]}
                        />
                        <ProjectCard
                            name="Gradient"
                            projectId="123"
                            author={{ username: 'emilwidlund', image: '' }}
                            preview="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                            layers={[
                                {
                                    id: '123',
                                    name: 'Test',
                                    context: `void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`,
                                    enabled: true,
                                    blendingMode: 'NORMAL'
                                }
                            ]}
                        />
                    </div>
                </section>
            )}
        </main>
    );
}

export default function Profile() {
    return <ProfileContainer />;
}
