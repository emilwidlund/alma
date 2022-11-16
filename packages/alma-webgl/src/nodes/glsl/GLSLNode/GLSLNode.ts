import { vec2, Type, Lit, bool, float, vec3, vec4, mat2, mat3, mat4, int } from '@thi.ng/shader-ast';
import { defnRaw, Processor } from 'alma-glsl';
import { Input, IOutputProps, Node, Output } from 'alma-graph';
import _ from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IGLSLNodeInputs, IGLSLNodeOutputs, IGLSLNodeProps } from './GLSLNode.types';

const processor = new Processor();

export class GLSLNode extends Node {
    static icon = 'add';
    static description = 'Returns the sum of the inputs.';

    name = 'GLSL';
    type = WebGLNodeType.GLSL;

    inputs: IGLSLNodeInputs;
    outputs: IGLSLNodeOutputs;

    constructor(context: WebGLContext, props: IGLSLNodeProps = {}) {
        super(context, props);

        const [decl] = processor.parse(`float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
        }`);

        const test = defnRaw(decl.returnType, decl.name, decl.parameters, decl.body);

        // @ts-ignore
        this.inputs = decl.parameters.map(
            // @ts-ignore
            ({ name, type }) => new Input(this, { name, type, defaultValue: this.getTypesafeValue(type) })
        );

        this.outputs = {
            output: new Output(
                this,
                _.defaults<Partial<IOutputProps<any>> | undefined, IOutputProps<any>>(props.outputs?.output, {
                    name: 'Output',
                    type: decl.returnType,
                    value: () => {
                        return test.apply(
                            this,
                            Object.values(this.inputs).map(input => this.resolveValue(input.value))
                        );
                    }
                })
            )
        };
    }

    /** Returns a typesafe value for given type */
    public getTypesafeValue(type: Type): Lit<Type> {
        switch (type) {
            case 'float':
                return float(0);
            case 'int':
                return int(0);
            case 'vec2':
                return vec2(0, 0);
            case 'vec3':
                return vec3(0, 0, 0);
            case 'vec4':
                return vec4(0, 0, 0, 1);
            case 'mat2':
                return mat2();
            case 'mat3':
                return mat3();
            case 'mat4':
                return mat4();
            case 'bool':
            default:
                return bool(true);
        }
    }
}
