import { bool, float, int, Lit, mat2, mat3, mat4, Type, vec2, vec3, vec4 } from '@thi.ng/shader-ast';
import { Context, INodeProps, Node } from '@usealma/graph';
import { IReactionDisposer, reaction } from 'mobx';

export abstract class PolymorphicNode extends Node {
    reactionDisposer: IReactionDisposer;

    constructor(
        context: Context,
        props: INodeProps = {},
        convertInputs: boolean | string[] = true,
        convertOutputs: boolean | string[] = true
    ) {
        super(context, props);

        this.reactionDisposer = reaction(
            () => this.data.type?.selected,
            (type, previous) => {
                if (type && type !== previous) {
                    const inputsToConvert =
                        typeof convertInputs === 'boolean'
                            ? convertInputs
                                ? Object.values(this.inputs)
                                : []
                            : Object.entries(this.inputs)
                                  .filter(([key, input]) => convertInputs.includes(key))
                                  .map(([key, input]) => input);

                    const outputsToConvert =
                        typeof convertOutputs === 'boolean'
                            ? convertOutputs
                                ? Object.values(this.outputs)
                                : []
                            : Object.entries(this.outputs)
                                  .filter(([key, output]) => convertOutputs.includes(key))
                                  .map(([key, output]) => output);

                    for (const port of [...inputsToConvert, ...outputsToConvert]) {
                        port.dispose();
                    }

                    for (const input of inputsToConvert) {
                        const typeSafeValue = this.getTypesafeValue(type);

                        input.defaultValue = typeSafeValue;
                        input.setValue(typeSafeValue);
                    }

                    for (const port of [...inputsToConvert, ...outputsToConvert]) {
                        port.type = type;
                    }
                }
            }
        );
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

    /** Disposes the Node */
    public dispose() {
        super.dispose();

        this.reactionDisposer();
    }
}
