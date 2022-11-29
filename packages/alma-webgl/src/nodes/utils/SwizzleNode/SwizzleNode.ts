import { vec2, $x, $y, $w, $z, float } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps, SerializableInputValue } from 'alma-graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ISwizzleNodeInputs, ISwizzleNodeOutputs, ISwizzleNodeProps } from './SwizzleNode.types';

export class SwizzleNode extends PolymorphicNode {
    static icon = 'device_hub';
    static description = 'Destructs a Vector and returns its individual components.';

    name = 'Swizzle';
    type = WebGLNodeType.SWIZZLE;

    inputs: ISwizzleNodeInputs;
    outputs: ISwizzleNodeOutputs;

    constructor(context: WebGLContext, props: ISwizzleNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'vec2',
                    options: ['vec2', 'vec3', 'vec4']
                }
            }
        });

        super(context, props);

        this.inputs = {
            vector: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.vector, {
                    name: 'Vector',
                    type: 'vec2',
                    defaultValue: vec2(0, 0)
                })
            )
        };

        this.outputs = {
            x: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.x, {
                    name: 'X',
                    type: 'float',
                    value: () => {
                        return $x<'vec2' | 'vec3' | 'vec4'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            y: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.y, {
                    name: 'Y',
                    type: 'float',
                    value: () => {
                        return $y<'vec2' | 'vec3' | 'vec4'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            z: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.z, {
                    name: 'Z',
                    type: 'float',
                    value: () => {
                        const value = this.resolveValue(this.inputs.vector.value);
                        return value.type === 'vec3' || value.type === 'vec4'
                            ? $z<'vec3' | 'vec4'>(value as SerializableInputValue<'vec3' | 'vec4'>)
                            : float(0);
                    }
                })
            ),
            w: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.w, {
                    name: 'W',
                    type: 'float',
                    value: () => {
                        const value = this.resolveValue(this.inputs.vector.value);
                        return value.type === 'vec4' ? $w<'vec4'>(value as SerializableInputValue<'vec4'>) : float(0);
                    }
                })
            )
        };
    }
}
