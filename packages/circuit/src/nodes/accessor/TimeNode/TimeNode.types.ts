import { INodeProps, IOutputProps, Output } from '@usealma/graph';

import { TimeNode } from './TimeNode';

export interface ITimeNodeOutputs {
    [key: string]: Output<'float', TimeNode>;
    time: Output<'float', TimeNode>;
}

export interface ITimeNodeProps extends INodeProps {
    outputs?: {
        time?: IOutputProps<'float'>;
    };
}
