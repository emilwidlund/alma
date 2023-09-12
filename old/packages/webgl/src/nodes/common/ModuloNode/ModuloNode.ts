import { float, mod } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { IModuloNodeInputs, IModuloNodeOutputs, IModuloNodeProps } from './ModuloNode.types';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class ModuloNode extends PolymorphicNode {
    static description = 'Performs a modulo operation on inputs. Returns the remainder of a division.';
    static nodeName = 'Modulo';
    type = WebGLNodeType.MODULO;

    declare inputs: IModuloNodeInputs;
    declare outputs: IModuloNodeOutputs;

    constructor(context: WebGLContext, props: IModuloNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'int', 'vec2', 'vec3', 'vec4', 'mat2', 'mat3', 'mat4']
                }
            }
        });

        super(context, props);

        this.inputs = {
            a: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.a, {
                    name: 'A',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            b: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.b, {
                    name: 'B',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            result: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.result, {
                    name: 'Result',
                    type: 'float',
                    value: () => {
                        return mod<'float'>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value)
                        );
                    }
                })
            )
        };
    }
}
