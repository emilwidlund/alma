import { $xy } from '@thi.ng/shader-ast';
import { aspectCorrectedUV } from '@thi.ng/shader-ast-stdlib';
import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { IUVNodeInputs, IUVNodeOutputs, IUVNodeProps } from './UVNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { fragUV } from '../../../utils/shaders/shaders';

export class UVNode extends Node {
    static description = 'Access to fragment coordinates. Aspect Corrected output is the UV corrected for the preview resolution ratio.';
    static nodeName = 'UV';
    type = WebGLNodeType.UV;

    declare inputs: IUVNodeInputs;
    declare outputs: IUVNodeOutputs;

    constructor(context: WebGLContext, props: IUVNodeProps = {}) {
        super(context, props);

        this.inputs = {};

        this.outputs = {
            aspectCorrected: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(
                    props.outputs?.aspectCorrected,
                    {
                        name: 'Aspect Corrected',
                        type: 'vec2',
                        value: () => {
                            return aspectCorrectedUV($xy(context.target.gl_FragCoord), context.uniforms.uResolution);
                        }
                    }
                )
            ),
            uv: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    value: () => {
                        return fragUV(context.target.gl_FragCoord, context.uniforms.uResolution);
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
