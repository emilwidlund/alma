import { $xy } from '@thi.ng/shader-ast';
import { defaults } from 'lodash';

import { Artboard } from '../../../../../alma-graph/src/core/Context/Context';
import { Node } from '../../../../../alma-graph/src/core/Node/Node';
import { INodeInputs, NodeType } from '../../../../../alma-graph/src/core/Node/Node.types';
import { Output } from '../../../../../alma-graph/src/core/Output/Output';
import { IOutputProps } from '../../../../../alma-graph/src/core/Output/Output.types';
import { IUVNodeOutputs, IUVNodeProps } from './UVNode.types';

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
