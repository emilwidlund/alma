import { $xy, bool, div } from '@thi.ng/shader-ast';
import { aspectCorrectedUV } from '@thi.ng/shader-ast-stdlib';
import { Node, IOutputProps, Output, IInputProps, Input } from '@usealma/graph';
import { defaults } from 'lodash';

import { IUVNodeInputs, IUVNodeOutputs, IUVNodeProps } from './UVNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class UVNode extends Node {
    static description = 'Access to fragment coordinates. UV is corrected for the preview resolution ratio.';
    static nodeName = 'UV';
    type = WebGLNodeType.UV;

    declare inputs: IUVNodeInputs;
    declare outputs: IUVNodeOutputs;

    constructor(context: WebGLContext, props: IUVNodeProps = {}) {
        super(context, props);

        this.inputs = {
            center: new Input(
                this,
                defaults<Partial<IInputProps<'bool'>> | undefined, IInputProps<'bool'>>(props.inputs?.center, {
                    name: 'Center',
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
                        // @ts-ignore
                        return this.resolveValue(this.inputs.center.value).val === true
                            ? aspectCorrectedUV($xy(context.target.gl_FragCoord), context.uniforms.uResolution)
                            : div($xy(context.target.gl_FragCoord), context.uniforms.uResolution);
                    }
                })
            ),
            fragCoord: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.fragCoord, {
                    name: 'Frag Coord',
                    type: 'vec4',
                    value: () => {
                        return context.target.gl_FragCoord;
                    }
                })
            )
        };
    }
}
