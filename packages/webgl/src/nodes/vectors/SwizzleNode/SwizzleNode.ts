import { vec2, $x, $y, $w, $z, Type, Lit, vec3, vec4, Swizzle, Term } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps, SerializableInputValue, Node } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';
import { IReactionDisposer, reaction } from 'mobx';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ISwizzleNodeInputs, ISwizzleNodeOutputs, ISwizzleNodeProps } from './SwizzleNode.types';

export class SwizzleNode extends Node {
    static icon = 'device_hub';
    static description = 'Destructs a Vector and returns its individual components.';

    static nodeName = 'Swizzle';
    type = WebGLNodeType.SWIZZLE;

    declare inputs: ISwizzleNodeInputs;
    declare outputs: ISwizzleNodeOutputs;
    reactionDisposer: IReactionDisposer;

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
            x: this.createOutput('X', $x, props.outputs?.x),
            y: this.createOutput('Y', $y, props.outputs?.y)
        };

        if (this.data.type?.selected === 'vec3' || this.data.type?.selected === 'vec4') {
            this.outputs.z = this.createOutput<'vec3'>('Z', $z, props.outputs?.z);
        }

        if (this.data.type?.selected === 'vec4') {
            this.outputs.w = this.createOutput<'vec4'>('W', $w, props.outputs?.w);
        }

        this.reactionDisposer = reaction(
            () => this.data.type?.selected,
            (type, previous) => {
                if (type && type !== previous) {
                    this.inputs.vector.dispose();
                    this.inputs.vector.setValue(this.getTypesafeValue(type));
                    this.inputs.vector.type = type as 'vec2' | 'vec3' | 'vec4';

                    for (const port of Object.values(this.outputs)) {
                        port.dispose();
                    }

                    delete this.outputs.z;
                    delete this.outputs.w;

                    this.outputs = {
                        x: this.createOutput('X', $x),
                        y: this.createOutput('Y', $y)
                    };

                    if (type === 'vec3' || type === 'vec4') {
                        this.outputs = {
                            ...this.outputs,
                            z: this.createOutput<'vec3'>('Z', $z)
                        };
                    }

                    if (type === 'vec4') {
                        this.outputs = {
                            ...this.outputs,
                            w: this.createOutput<'vec4'>('W', $w)
                        };
                    }
                }
            }
        );
    }

    /** Creates Swizzle Output */
    public createOutput<T extends 'vec2' | 'vec3' | 'vec4'>(
        name: string,
        swizzle: (val: Term<T>) => Swizzle<'float'>,
        props?: IOutputProps<'float'>
    ): Output<'float', this> {
        return new Output(
            this,
            defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props, {
                name,
                type: 'float',
                value: () => {
                    return swizzle(this.resolveValue(this.inputs.vector.value as SerializableInputValue<T>));
                }
            })
        );
    }

    /** Returns a typesafe value for given type */
    public getTypesafeValue(type: Type): Lit<'vec2' | 'vec3' | 'vec4'> {
        switch (type) {
            case 'vec3':
                return vec3(0, 0, 0);
            case 'vec4':
                return vec4(0, 0, 0, 1);
            default:
                return vec2(0, 0);
        }
    }

    /** Disposes the Node */
    public dispose() {
        super.dispose();

        this.reactionDisposer();
    }
}
