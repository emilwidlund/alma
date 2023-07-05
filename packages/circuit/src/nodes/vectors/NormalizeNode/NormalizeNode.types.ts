import { Vec } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { NormalizeNode } from './NormalizeNode';

export interface INormalizeNodeInputs {
    [key: string]: Input<Vec, NormalizeNode>;
    input: Input<Vec, NormalizeNode>;
}

export interface INormalizeNodeOutputs {
    [key: string]: Output<Vec, NormalizeNode>;
    output: Output<Vec, NormalizeNode>;
}

export interface INormalizeNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Vec>;
    };
    outputs?: {
        output?: IOutputProps<Vec>;
    };
}
