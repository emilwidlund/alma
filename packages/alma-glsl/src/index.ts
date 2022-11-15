import { parser } from '@shaderfrog/glsl-parser';

const ast = parser.parse(`
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
`);
