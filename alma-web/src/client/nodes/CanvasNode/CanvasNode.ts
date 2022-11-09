import { defaultsDeep } from 'lodash';
import { autorun, IReactionDisposer } from 'mobx';

import type { ICanvasNodeData, ICanvasNodeOutputs, ICanvasNodeProps, ICanvasNodeSerialized } from './CanvasNode.types';
import { Node } from '../../../core/api/Node/Node';
import { ValueType } from '../../lib/types';
import type { Circuit } from '../../lib/Circuit/Circuit';

export class CanvasNode extends Node<never, ICanvasNodeOutputs, ICanvasNodeData, ICanvasNodeSerialized> {
    /** Internal Reaction Disposer */
    reactionDisposer: IReactionDisposer;

    constructor(circuit: Circuit, props?: ICanvasNodeProps) {
        const defaultProps = defaultsDeep(props, {
            outputs: {
                width: {
                    name: 'Width',
                    defaultValue: circuit.renderer.width,
                    type: ValueType.NUMBER
                },
                height: {
                    name: 'Height',
                    defaultValue: circuit.renderer.height,
                    type: ValueType.NUMBER
                }
            }
        });

        super(circuit, defaultProps);

        this.reactionDisposer = autorun(() => {
            this.outputs.width.value = circuit.renderer.width;
            this.outputs.height.value = circuit.renderer.height;
        });
    }

    /** Cleanup */
    public dispose(): void {
        super.dispose();

        this.reactionDisposer();
    }
}
