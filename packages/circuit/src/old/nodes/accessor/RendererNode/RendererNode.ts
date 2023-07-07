import { vec4 } from '@thi.ng/shader-ast';
import { Node, IInputProps, Input, INodeOutputs } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { IRendererNodeInputs, IRendererNodeProps } from './RendererNode.types';

export class RendererNode extends Node {
    static icon = 'deblur';
    static description = 'Root node of the graph. Renders the input to its associated render target.';

    static nodeName = 'Renderer';
    type = WebGLNodeType.RENDERER;

    inputs: IRendererNodeInputs;
    outputs: INodeOutputs;

    constructor(circuit: Circuit, props: IRendererNodeProps = {}) {
        super(circuit, props);

        this.inputs = {
            color: new Input(
                this,
                defaults<Partial<IInputProps<'vec4'>> | undefined, IInputProps<'vec4'>>(props.inputs?.color, {
                    name: 'Color',
                    type: 'vec4',
                    defaultValue: vec4(0, 0, 0, 1)
                })
            )
        };

        this.outputs = {};
    }
}
