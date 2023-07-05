import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { StepNode } from './StepNode';

export interface IStepNodeInputs {
    [key: string]: Input<Prim, StepNode>;
    edge: Input<Prim, StepNode>;
    input: Input<Prim, StepNode>;
}

export interface IStepNodeOutputs {
    [key: string]: Output<Prim, StepNode>;
    output: Output<Prim, StepNode>;
}

export interface IStepNodeProps extends INodeProps {
    inputs?: {
        edge?: IInputProps<Prim>;
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
