import { $xy } from '@thi.ng/shader-ast';
import { defaults } from 'lodash';
import { INodeInputs, NodeType } from '../../../core/Node/Node.types';
import { Node } from '../../../core/Node/Node';
import { Artboard } from '../../../core/Context/Context';
import { IUVNodeOutputs, IUVNodeProps } from './UVNode.types';
import { Output } from '../../../core/Output/Output';
import { IOutputProps } from '../../../core/Output/Output.types';

export class UVNode extends Node {
    type = NodeType.UV;

    inputs: INodeInputs;
    outputs: IUVNodeOutputs;

    constructor(artboard: Artboard, props: IUVNodeProps = {}) {
        super(artboard, props);

        this.inputs = {};

        this.outputs = {
            uv: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    value: () => {
                        return $xy(this.artboard.target.gl_FragCoord);
                    }
                })
            )
        };
    }
}
