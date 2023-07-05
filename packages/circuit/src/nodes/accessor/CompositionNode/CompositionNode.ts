import { $xy, texture, vec4 } from '@thi.ng/shader-ast';
import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { ICompositionNodeInputs, ICompositionNodeOutputs, ICompositionNodeProps } from './CompositionNode.types';

export class CompositionNode extends Node {
    static icon = 'layers';
    static description = 'Exposes the layer below in the layer hierarchy.';
    static nodeName = 'Composition';

    type = WebGLNodeType.COMPOSITION;
    inputs: ICompositionNodeInputs;
    outputs: ICompositionNodeOutputs;

    constructor(circuit: Circuit, props: ICompositionNodeProps = {}) {
        super(circuit, props);

        this.inputs = {};

        this.outputs = {
            texture: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.texture, {
                    name: 'Texture',
                    type: 'vec4',
                    value: () => {
                        const sampler = circuit.uniforms?.previousTexture;
                        return sampler ? texture(sampler, $xy(circuit.target.gl_FragCoord)) : vec4(0, 0, 0, 1);
                    }
                })
            )
        };
    }
}
