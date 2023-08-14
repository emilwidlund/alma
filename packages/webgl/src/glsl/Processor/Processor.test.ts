import { Processor } from './Processor';

describe('Processor', () => {
    const processor = new Processor();
    const fns = `float rand(vec2 co) {
            return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        float getColorComponent(in vec2 st, in float modScale, in float blur) {
            vec2 modSt = mod(st, 1. / modScale) * modScale * 2. - 1.;
            float dist = length(modSt);
            float angle = atan(modSt.x, modSt.y) + sin(iTime * .08) * 9.0;
            //dist = sdPolygon(angle, dist);
            //dist += sin(angle * 3. + iTime * .21) * .2 + cos(angle * 4. - iTime * .3) * .1;
            float shapeMap = smoothstep(SHAPE_SIZE + blur, SHAPE_SIZE - blur, sin(dist * 3.0) * .5 + .5);
            return shapeMap;
        }`;

    it('should parse GLSL functions correctly', () => {
        const functionDeclarations = processor.parse(fns);

        expect(functionDeclarations).toEqual([
            {
                name: 'rand',
                parameters: [{ name: 'co', type: 'vec2' }],
                returnType: 'float',
                body: `return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
        `
            },
            {
                name: 'getColorComponent',
                parameters: [
                    { name: 'st', type: 'vec2' },
                    { name: 'modScale', type: 'float' },
                    { name: 'blur', type: 'float' }
                ],
                returnType: 'float',
                body: `vec2 modSt = mod(st, 1. / modScale) * modScale * 2. - 1.;
            float dist = length(modSt);
            float angle = atan(modSt.x, modSt.y) + sin(iTime * .08) * 9.0;
            //dist = sdPolygon(angle, dist);
            //dist += sin(angle * 3. + iTime * .21) * .2 + cos(angle * 4. - iTime * .3) * .1;
            float shapeMap = smoothstep(SHAPE_SIZE + blur, SHAPE_SIZE - blur, sin(dist * 3.0) * .5 + .5);
            return shapeMap;
        `
            }
        ]);
    });
});
