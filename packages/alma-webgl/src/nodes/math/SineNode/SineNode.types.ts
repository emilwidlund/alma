import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { SineNode } from './SineNode';

export interface ISineNodeInputs {
    [key: string]: Input<'float', SineNode>;
    input: Input<'float', SineNode>;
}

export interface ISineNodeOutputs {
    [key: string]: Output<'float', SineNode>;
    output: Output<'float', SineNode>;
}

export interface ISineNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<'float'>;
    };
    outputs?: {
        output?: IOutputProps<'float'>;
    };
}
