import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { CeilNode } from './CeilNode';

export interface ICeilNodeInputs {
    [key: string]: Input<Prim, CeilNode>;
    input: Input<Prim, CeilNode>;
}

export interface ICeilNodeOutputs {
    [key: string]: Output<Prim, CeilNode>;
    output: Output<Prim, CeilNode>;
}

export interface ICeilNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
