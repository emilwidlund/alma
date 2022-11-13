import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { CosineNode } from './CosineNode';

export interface ICosineNodeInputs {
    [key: string]: Input<'float', CosineNode>;
    input: Input<'float', CosineNode>;
}

export interface ICosineNodeOutputs {
    [key: string]: Output<'float', CosineNode>;
    output: Output<'float', CosineNode>;
}

export interface ICosineNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<'float'>;
    };
    outputs?: {
        output?: IOutputProps<'float'>;
    };
}
