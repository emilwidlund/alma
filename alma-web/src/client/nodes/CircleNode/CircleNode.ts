import { defaultsDeep } from 'lodash';
import { autorun, IReactionDisposer } from 'mobx';
import * as Color from 'color';

import { ICircleNodeData, ICircleNodeInputs, ICircleNodeProps, ICircleNodeSerialized } from './CircleNode.types';
import { Node } from '../../../core/api/Node/Node';
import { Circuit } from '../../lib/Circuit/Circuit';
import { ValueType } from '../../lib/types';
import { Renderer } from '../../lib/Renderer/Renderer';
import { RendererType } from '../../lib/Renderer/Renderer.types';

export class CircleNode extends Node<ICircleNodeInputs, never, ICircleNodeData, ICircleNodeSerialized> {
    /** Internal Reaction Disposer */
    reactionDisposer: IReactionDisposer;

    constructor(circuit: Circuit, props?: ICircleNodeProps) {
        const defaultProps = defaultsDeep(props, {
            inputs: {
                radius: {
                    name: 'Radius',
                    defaultValue: circuit.renderer.height / 4,
                    min: 0,
                    max: 1000,
                    step: 1,
                    type: ValueType.NUMBER
                },
                position: {
                    name: 'Position',
                    defaultValue: [circuit.renderer.width / 2, circuit.renderer.height / 2],
                    type: ValueType.VECTOR2
                },
                strokeWidth: {
                    name: 'Stroke Width',
                    defaultValue: 1,
                    min: 0,
                    max: 1000,
                    step: 1,
                    type: ValueType.NUMBER
                },
                strokeColor: {
                    name: 'Stroke Color',
                    defaultValue: new Color(),
                    type: ValueType.COLOR
                }
            }
        });

        super(circuit, defaultProps);

        this.reactionDisposer = autorun(() => {
            if (circuit.renderer.type === RendererType.CANVAS) {
                const c = (circuit.renderer as Renderer<RendererType.CANVAS>).context;

                c.save();

                c.clearRect(0, 0, circuit.renderer.width, circuit.renderer.height);

                c.strokeStyle = this.inputs.strokeColor.value.hex();
                c.beginPath();
                c.arc(
                    this.inputs.position.value.x,
                    this.inputs.position.value.y,
                    this.inputs.radius.value,
                    0,
                    2 * Math.PI
                );
                c.closePath();

                c.lineWidth = this.inputs.strokeWidth.value;
                c.stroke();

                c.restore();
            }
        });
    }

    /** Cleanup */
    public dispose(): void {
        super.dispose();

        this.reactionDisposer();
    }
}
