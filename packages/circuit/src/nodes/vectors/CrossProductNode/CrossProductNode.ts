import { cross, vec3 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps, Node } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { ICrossProductNodeInputs, ICrossProductNodeOutputs, ICrossProductNodeProps } from './CrossProductNode.types';

export class CrossProductNode extends Node {
    static icon = 'shuffle';
    static description = 'Returns the cross product of two vectors, A and B.';
    static nodeName = 'Cross Product';

    type = WebGLNodeType.CROSS_PRODUCT;

    inputs: ICrossProductNodeInputs;
    outputs: ICrossProductNodeOutputs;

    constructor(circuit: Circuit, props: ICrossProductNodeProps = {}) {
        super(circuit, props);

        this.inputs = {
            a: new Input(
                this,
                defaults<Partial<IInputProps<'vec3'>> | undefined, IInputProps<'vec3'>>(props.inputs?.a, {
                    name: 'A',
                    type: 'vec3',
                    defaultValue: vec3(0, 0, 0)
                })
            ),
            b: new Input(
                this,
                defaults<Partial<IInputProps<'vec3'>> | undefined, IInputProps<'vec3'>>(props.inputs?.b, {
                    name: 'B',
                    type: 'vec3',
                    defaultValue: vec3(0, 0, 0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<Partial<IOutputProps<'vec3'>> | undefined, IOutputProps<'vec3'>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'vec3',
                    value: () => {
                        return cross(this.resolveValue(this.inputs.a.value), this.resolveValue(this.inputs.b.value));
                    }
                })
            )
        };
    }
}
