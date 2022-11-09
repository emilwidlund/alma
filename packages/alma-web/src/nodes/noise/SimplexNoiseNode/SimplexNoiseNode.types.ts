import { Input } from '../../../../../alma-graph/src/core/Input/Input';
import { IInputProps } from '../../../../../alma-graph/src/core/Input/Input.types';
import { INodeProps } from '../../../../../alma-graph/src/core/Node/Node.types';
import { Output } from '../../../../../alma-graph/src/core/Output/Output';
import { IOutputProps } from '../../../../../alma-graph/src/core/Output/Output.types';
import { SimplexNoiseNode } from './SimplexNoiseNode';

export interface ISimplexNoiseNodeInputs {
    [key: string]: Input<'float', SimplexNoiseNode> | Input<'vec2', SimplexNoiseNode>;
    octaves: Input<'float', SimplexNoiseNode>;
    shift: Input<'vec2', SimplexNoiseNode>;
    decay: Input<'float', SimplexNoiseNode>;
    uv: Input<'vec2', SimplexNoiseNode>;
}

export interface ISimplexNoiseNodeOutputs {
    [key: string]: Output<'vec4', SimplexNoiseNode>;
    output: Output<'vec4', SimplexNoiseNode>;
}

export interface ISimplexNoiseNodeProps extends INodeProps {
    inputs?: {
        octaves?: IInputProps<'float'>;
        shift?: IInputProps<'vec2'>;
        decay?: IInputProps<'float'>;
        uv?: IInputProps<'vec2'>;
    };
    outputs?: {
        output?: IOutputProps<'vec4'>;
    };
}
