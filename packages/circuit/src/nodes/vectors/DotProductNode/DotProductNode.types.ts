import { Vec } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { DotProductNode } from './DotProductNode';

export interface IDotProductNodeInputs {
    [key: string]: Input<Vec, DotProductNode>;
    a: Input<Vec, DotProductNode>;
    b: Input<Vec, DotProductNode>;
}

export interface IDotProductNodeOutputs {
    [key: string]: Output<'float', DotProductNode>;
    output: Output<'float', DotProductNode>;
}

export interface IDotProductNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<Vec>;
        b?: IInputProps<Vec>;
    };
    outputs?: {
        output?: IOutputProps<'float'>;
    };
}
