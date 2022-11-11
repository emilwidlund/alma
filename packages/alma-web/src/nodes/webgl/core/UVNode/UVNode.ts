import { $xy } from '@thi.ng/shader-ast';
import { aspectCorrectedUV } from '@thi.ng/shader-ast-stdlib';
import { Node, INodeInputs, IOutputProps, Output } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../../client/webgl/models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../types';
import { IUVNodeOutputs, IUVNodeProps } from './UVNode.types';

export class UVNode extends Node {
    static icon = 'grid_on';
    static description = "Aspect corrected UV coordinates based on the WebGL Context's resolution.";

    type = WebGLNodeType.UV;

    inputs: INodeInputs;
    outputs: IUVNodeOutputs;

    constructor(context: WebGLContext, props: IUVNodeProps = {}) {
        super(context, props);

        this.inputs = {};

        this.outputs = {
            uv: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    value: () => {
                        return aspectCorrectedUV(
                            this.resolveValue($xy(context.target.gl_FragCoord)),
                            context.uniforms.resolution
                        );
                    }
                })
            )
        };
    }
}
