import { defn, float, FloatSym, ret, sym, vec2, Vec2Sym, vec3, vec4 } from '@thi.ng/shader-ast';
import { additive, aspectCorrectedUV, fit1101, snoise2 } from '@thi.ng/shader-ast-stdlib';
import { defaults } from 'lodash';

import { Artboard } from '../../../core/Context/Context';
import { Input } from '../../../core/Input/Input';
import { IInputProps } from '../../../core/Input/Input.types';
import { Node } from '../../../core/Node/Node';
import { NodeType } from '../../../core/Node/Node.types';
import { Output } from '../../../core/Output/Output';
import { IOutputProps } from '../../../core/Output/Output.types';
import { ISimplexNoiseNodeInputs, ISimplexNoiseNodeOutputs, ISimplexNoiseNodeProps } from './SimplexNoiseNode.types';

export class SimplexNoiseNode extends Node {
    type = NodeType.PERLIN_NOISE;

    inputs: ISimplexNoiseNodeInputs;
    outputs: ISimplexNoiseNodeOutputs;

    constructor(artboard: Artboard, props: ISimplexNoiseNodeProps = {}) {
        super(artboard, props);

        this.inputs = {
            octaves: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.octaves, {
                    name: 'Octaves',
                    type: 'float',
                    defaultValue: float(4)
                })
            ),
            shift: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.shift, {
                    name: 'Shift',
                    type: 'vec2',
                    defaultValue: vec2(2)
                })
            ),
            decay: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.decay, {
                    name: 'Decay',
                    type: 'float',
                    defaultValue: float(0.5)
                })
            ),
            uv: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    defaultValue: vec2(0, 0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'vec4',
                    value: () => {
                        return defn('vec4', 'simplexNoise', [], () => {
                            let uv: Vec2Sym;
                            let col: FloatSym;

                            return [
                                (uv = sym(
                                    aspectCorrectedUV(
                                        this.resolveValue(this.inputs.uv.value),
                                        this.artboard.uniforms.resolution
                                    )
                                )),
                                // dynamically create a multi-octave version of `snoise2`
                                // computed over 4 octaves w/ given phase shift and decay
                                // factor (both per octave)
                                (col = sym(
                                    additive('vec2', snoise2, this.resolveValue(this.inputs.octaves.value))(
                                        uv,
                                        this.resolveValue(this.inputs.shift.value),
                                        this.resolveValue(this.inputs.decay.value)
                                    )
                                )),
                                ret(vec4(vec3(fit1101(col)), 1))
                            ];
                        });
                    }
                })
            )
        };
    }
}
