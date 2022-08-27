import { defaultsDeep } from 'lodash';
import { autorun, IReactionDisposer } from 'mobx';

import { Circuit } from '../../lib/Circuit/Circuit';
import { Node } from '../../../core/api/Node/Node';
import { ValueType } from '../../lib/types';
import { Vector2 } from '../../lib/Vector2/Vector2';

import {
    IVector2NodeData,
    IVector2NodeInputs,
    IVector2NodeOutputs,
    IVector2NodeProps,
    IVector2NodeSerialized
} from './Vector2Node.types';

export class Vector2Node extends Node<
    IVector2NodeInputs,
    IVector2NodeOutputs,
    IVector2NodeData,
    IVector2NodeSerialized
> {
    /** Internal Reaction Disposer */
    reactionDisposer: IReactionDisposer;

    constructor(circuit: Circuit, props?: IVector2NodeProps) {
        const defaultProps = defaultsDeep(props, {
            inputs: {
                x: {
                    name: 'X',
                    defaultValue: 0,
                    min: -Infinity,
                    max: Infinity,
                    step: 1,
                    type: ValueType.NUMBER
                },
                y: {
                    name: 'Y',
                    defaultValue: 0,
                    min: -Infinity,
                    max: Infinity,
                    step: 1,
                    type: ValueType.NUMBER
                }
            },
            outputs: {
                out: {
                    name: 'Out',
                    defaultValue: new Vector2(),
                    type: ValueType.VECTOR2
                },
                magnitude: {
                    name: 'Magnitude',
                    defaultValue: new Vector2().magnitude,
                    type: ValueType.NUMBER
                },
                angle: {
                    name: 'Angle',
                    defaultValue: new Vector2().angle,
                    type: ValueType.NUMBER
                }
            }
        });

        super(circuit, defaultProps);

        const vector = new Vector2();

        this.reactionDisposer = autorun(r => {
            this.outputs.out.setValue(vector.set(this.inputs.x.value, this.inputs.y.value));
            this.outputs.magnitude.setValue(vector.magnitude);
            this.outputs.angle.setValue(vector.angle);
        });
    }

    /** Cleanup */
    public dispose(): void {
        super.dispose();

        this.reactionDisposer();
    }
}
