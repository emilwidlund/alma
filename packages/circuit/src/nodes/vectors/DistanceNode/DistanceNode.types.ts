import { Vec } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { DistanceNode } from './DistanceNode';

export interface IDistanceNodeInputs {
    [key: string]: Input<Vec, DistanceNode>;
    a: Input<Vec, DistanceNode>;
    b: Input<Vec, DistanceNode>;
}

export interface IDistanceNodeOutputs {
    [key: string]: Output<'float', DistanceNode>;
    distance: Output<'float', DistanceNode>;
}

export interface IDistanceNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<Vec>;
        b?: IInputProps<Vec>;
    };
    outputs?: {
        distance?: IOutputProps<'float'>;
    };
}
