import { Vec } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { LengthNode } from './LengthNode';

export interface ILengthNodeInputs {
    [key: string]: Input<Vec, LengthNode>;
    input: Input<Vec, LengthNode>;
}

export interface ILengthNodeOutputs {
    [key: string]: Output<'float', LengthNode>;
    length: Output<'float', LengthNode>;
}

export interface ILengthNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Vec>;
    };
    outputs?: {
        length?: IOutputProps<'float'>;
    };
}
