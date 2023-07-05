import { INodeProps, IOutputProps, Output } from '@usealma/graph';

import { PINode } from './PINode';

export interface IPINodeOutputs {
    [key: string]: Output<'float', PINode>;
    pi: Output<'float', PINode>;
    halfPi: Output<'float', PINode>;
}

export interface IPINodeProps extends INodeProps {
    outputs?: {
        pi?: IOutputProps<'float'>;
        halfPi?: IOutputProps<'float'>;
    };
}
