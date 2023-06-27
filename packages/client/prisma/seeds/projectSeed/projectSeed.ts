const GRADIENT_FRAGMENT = `void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

const FLOW_GRADIENT_FRAGMENT = `#define S(a,b,t) smoothstep(a,b,t)

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

module.exports = [
    {
        name: 'Gradient',
        layers: {
            create: [
                {
                    name: 'Gradient',
                    type: 'FRAGMENT',
                    fragment: GRADIENT_FRAGMENT
                }
            ]
        },
        owner: {
            connect: {
                email: 'inzanic@gmail.com'
            }
        }
    },
    {
        name: 'Flow Gradient',
        layers: {
            create: [
                {
                    name: 'Flow',
                    type: 'FRAGMENT',
                    fragment: FLOW_GRADIENT_FRAGMENT
                }
            ]
        },
        owner: {
            connect: {
                email: 'inzanic@gmail.com'
            }
        }
    },
    {
        name: 'My Second Project',
        layers: {
            create: [
                {
                    name: 'Gradient',
                    type: 'FRAGMENT',
                    fragment: GRADIENT_FRAGMENT
                }
            ]
        },
        owner: {
            connect: {
                email: 'ewidlund@alma.sh'
            }
        }
    },
    {
        name: 'My First Project',
        layers: {
            create: [
                {
                    name: 'Flow',
                    type: 'FRAGMENT',
                    fragment: FLOW_GRADIENT_FRAGMENT
                }
            ]
        },
        owner: {
            connect: {
                email: 'ewidlund@alma.sh'
            }
        }
    }
];
