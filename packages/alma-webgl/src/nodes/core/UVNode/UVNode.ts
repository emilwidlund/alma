import { $xy, ternary, bool } from '@thi.ng/shader-ast';
import { fragUV, aspectCorrectedUV } from '@thi.ng/shader-ast-stdlib';
import { Node, IOutputProps, Output, Input, IInputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IUVNodeInputs, IUVNodeOutputs, IUVNodeProps } from './UVNode.types';

export class UVNode extends Node {
    static icon = 'grid_on';
    static description = "Aspect corrected UV coordinates based on the WebGL Context's resolution.";

    name = 'UV';
    type = WebGLNodeType.UV;

    inputs: IUVNodeInputs;
    outputs: IUVNodeOutputs;

    constructor(context: WebGLContext, props: IUVNodeProps = {}) {
        super(context, props);

        this.inputs = {
            center: new Input(
                this,
                defaults<Partial<IInputProps<'bool'>> | undefined, IInputProps<'bool'>>(props.inputs?.center, {
                    name: 'center',
                    type: 'bool',
                    defaultValue: bool(false)
                })
            )
        };

        this.outputs = {
            uv: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    value: () => {
                        return ternary(
                            this.resolveValue(this.inputs.center.value),
                            aspectCorrectedUV($xy(context.target.gl_FragCoord), context.uniforms.resolution),
                            fragUV(context.target.gl_FragCoord, context.uniforms.resolution)
                        );
                    }
                })
            )
        };
    }
}
