import { $xy } from '@thi.ng/shader-ast';
import { Node, INodeInputs, IOutputProps, Output } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLNodeType } from '../..';
import { WebGLContext } from '../../../../client/models/WebGLContext/WebGLContext';
import { IUVNodeOutputs, IUVNodeProps } from './UVNode.types';

export class UVNode extends Node {
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
                        return $xy(context.target.gl_FragCoord);
                    }
                })
            )
        };
    }
}
