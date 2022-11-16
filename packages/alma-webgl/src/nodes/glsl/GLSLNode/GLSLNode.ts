import { vec2, float } from '@thi.ng/shader-ast';
import { defnRaw, Processor } from 'alma-glsl';
import { IOutputProps, Node, Output } from 'alma-graph';
import _ from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IGLSLNodeInputs, IGLSLNodeOutputs, IGLSLNodeProps } from './GLSLNode.types';

const processor = new Processor();

export class GLSLNode extends Node {
    static icon = 'add';
    static description = 'Returns the sum of the inputs.';

    name = 'GLSL';
    type = WebGLNodeType.GLSL;

    inputs: IGLSLNodeInputs;
    outputs: IGLSLNodeOutputs;

    constructor(context: WebGLContext, props: IGLSLNodeProps = {}) {
        super(context, props);

        const [decl] = processor.parse(`
        float getColorComponent(in vec2 st, in float modScale, in float blur) {
            vec2 modSt = mod(st, 1. / modScale) * modScale * 2. - 1.;
            float dist = length(modSt);
            float angle = atan(modSt.x, modSt.y) + sin(iTime * .08) * 9.0;
            //dist = sdPolygon(angle, dist);
            //dist += sin(angle * 3. + iTime * .21) * .2 + cos(angle * 4. - iTime * .3) * .1;
            float shapeMap = smoothstep(SHAPE_SIZE + blur, SHAPE_SIZE - blur, sin(dist * 3.0) * .5 + .5);
            return shapeMap;
        }
        `);

        const test = defnRaw(
            'vec4',
            'getColorComponent',
            decl.parameters,
            `
            vec2 modSt = mod(st, 1. / modScale) * modScale * 2. - 1.;
            float dist = length(modSt);
            float angle = atan(modSt.x, modSt.y) + sin(iTime * .08) * 9.0;
            //dist = sdPolygon(angle, dist);
            //dist += sin(angle * 3. + iTime * .21) * .2 + cos(angle * 4. - iTime * .3) * .1;
            float shapeMap = smoothstep(SHAPE_SIZE + blur, SHAPE_SIZE - blur, sin(dist * 3.0) * .5 + .5);
            return shapeMap;`
        );

        this.inputs = {};

        this.outputs = {
            output: new Output(
                this,
                _.defaults<Partial<IOutputProps<any>> | undefined, IOutputProps<any>>(props.outputs?.output, {
                    name: 'Output',
                    type: decl.returnType,
                    value: () => {
                        return test(vec2(0, 0), float(1), float(5));
                    }
                })
            )
        };
    }
}
