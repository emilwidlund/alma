import { defaults } from 'lodash';

import { Artboard } from '../../../core/Context/Context';
import { Node } from '../../../core/Node/Node';
import { INodeInputs, NodeType } from '../../../core/Node/Node.types';
import { Output } from '../../../core/Output/Output';
import { IOutputProps } from '../../../core/Output/Output.types';
import { ITimeNodeOutputs, ITimeNodeProps } from './TimeNode.types';

export class TimeNode extends Node {
    type = NodeType.TIME;

    inputs: INodeInputs;
    outputs: ITimeNodeOutputs;

    constructor(artboard: Artboard, props: ITimeNodeProps = {}) {
        super(artboard, props);

        this.inputs = {};

        this.outputs = {
            time: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.time, {
                    name: 'Time',
                    type: 'float',
                    value: () => {
                        return this.artboard.uniforms.time;
                    }
                })
            )
        };
    }
}
