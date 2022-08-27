import { defaultsDeep } from 'lodash';
import { autorun, IReactionDisposer } from 'mobx';
import * as Color from 'color';

import {
    IColorNodeData,
    IColorNodeInputs,
    IColorNodeOutputs,
    IColorNodeProps,
    IColorNodeSerialized
} from './ColorNode.types';
import { Circuit } from '../../lib/Circuit/Circuit';
import { Node } from '../../../core/api/Node/Node';
import { ValueType } from '../../lib/types';

export class ColorNode extends Node<IColorNodeInputs, IColorNodeOutputs, IColorNodeData, IColorNodeSerialized> {
    /** Internal Reaction Disposer */
    reactionDisposer: IReactionDisposer;

    constructor(circuit: Circuit, props?: IColorNodeProps) {
        const defaultProps = defaultsDeep(props, {
            inputs: {
                red: {
                    name: 'Red',
                    defaultValue: 0,
                    type: ValueType.NUMBER
                },
                green: {
                    name: 'Green',
                    defaultValue: 0,
                    type: ValueType.NUMBER
                },
                blue: {
                    name: 'Blue',
                    defaultValue: 0,
                    type: ValueType.NUMBER
                },
                alpha: {
                    name: 'Alpha',
                    defaultValue: 1,
                    type: ValueType.NUMBER
                }
            },
            outputs: {
                out: {
                    name: 'Out',
                    defaultValue: Color().red(0).green(0).blue(0),
                    type: ValueType.COLOR
                }
            }
        });

        super(circuit, defaultProps);

        this.reactionDisposer = autorun(r => {
            this.outputs.out.setValue(
                Color()
                    .red(this.inputs.red.value * 255)
                    .green(this.inputs.green.value * 255)
                    .blue(this.inputs.blue.value * 255)
            );
        });
    }

    /** Cleanup */
    public dispose(): void {
        super.dispose();

        this.reactionDisposer();
    }
}
