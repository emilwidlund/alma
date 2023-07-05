import { vec2, Type, Lit, bool, float, vec3, vec4, mat2, mat3, mat4, int } from '@thi.ng/shader-ast';
import { defnRaw, IParsedFunctionParameter, Processor } from '@usealma/glsl';
import { IInputProps, Input, Node, Output } from '@usealma/graph';
import _, { startCase } from 'lodash';
import { action, makeObservable } from 'mobx';

import { IGLSLNodeData, IGLSLNodeInputs, IGLSLNodeOutputs, IGLSLNodeProps } from './GLSLNode.types';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';

const processor = new Processor();

export class GLSLNode extends Node {
    static icon = 'stream';
    static description = 'This node was automatically generated from GLSL code.';

    static nodeName = 'GLSL';
    type = WebGLNodeType.GLSL;

    declare inputs: IGLSLNodeInputs;
    declare outputs: IGLSLNodeOutputs;
    data: IGLSLNodeData;
    private properties: IGLSLNodeProps;

    constructor(circuit: Circuit, props: IGLSLNodeProps) {
        super(circuit, props);
        this.properties = { ...props };

        this.data = _.defaultsDeep(props.data, {
            glsl: '',
            position: {
                x: 0,
                y: 0
            }
        });

        makeObservable(this, {
            setGLSL: action
        });

        if (props.inputs) {
            this.inputs = Object.values(props.inputs).reduce<Record<string, Input<any, GLSLNode>>>(
                (accumulated, { name, type }) => ({
                    ...accumulated,
                    [name]: new Input(
                        this,
                        _.defaults<Partial<IInputProps<any>> | undefined, IInputProps<any>>(
                            this.properties.inputs?.[name],
                            {
                                name,
                                type,
                                defaultValue: this.getTypesafeValue(type)
                            }
                        )
                    )
                }),
                {}
            );
        }

        this.outputs = {};

        this.setGLSL(this.data.glsl);
    }

    /** Creates new inputs for those that changed */
    private buildInputs(parameters: IParsedFunctionParameter[], inputs: IGLSLNodeInputs) {
        const params = parameters.reduce((accumulated, current) => ({ ...accumulated, [current.name]: current }), {});

        return Object.entries<IParsedFunctionParameter>(params).reduce<Record<string, Input<any, GLSLNode>>>(
            (accumulated, [key, param]) => {
                const inputWithMatchingKey = inputs[key];

                if (!inputWithMatchingKey || inputWithMatchingKey.type !== param.type) {
                    inputWithMatchingKey?.dispose();

                    return {
                        ...accumulated,
                        [key]: new Input(this, {
                            name: param.name,
                            type: param.type,
                            defaultValue: this.getTypesafeValue(param.type)
                        })
                    };
                } else {
                    return { ...accumulated, [key]: inputs[key] };
                }
            },
            {}
        );
    }

    /** Writes GLSL to the Node */
    public setGLSL(glsl: string) {
        const [decl] = processor.parse(glsl);

        this.name = startCase(decl.name);

        this.inputs = this.buildInputs(decl.parameters, this.inputs);

        const previousConnections = this.outputs?.output?.connections;

        this.outputs?.output?.dispose();

        this.outputs = {
            output: new Output(this, {
                id: this.properties.outputs?.output?.id,
                name: 'Output',
                type: decl.returnType,
                value: () => {
                    return defnRaw(decl.returnType, decl.name, decl.parameters, decl.body).apply(
                        this,
                        Object.values(this.inputs).map(input => this.resolveValue(input.value))
                    );
                }
            })
        };

        if (previousConnections) {
            for (const connection of previousConnections) {
                this.outputs.output.connect(connection.to);
            }
        }

        this.data.glsl = glsl;
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
