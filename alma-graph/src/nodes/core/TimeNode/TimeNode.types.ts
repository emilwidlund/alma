import { TimeNode } from './TimeNode';
import { INodeProps } from '../../../core/Node/Node.types';
import { Output } from '../../../core/Output/Output';
import { IOutputProps } from '../../../core/Output/Output.types';

export interface ITimeNodeOutputs {
    [key: string]: Output<'float', TimeNode>;
    time: Output<'float', TimeNode>;
}

export interface ITimeNodeProps extends INodeProps {
    outputs?: {
        time?: IOutputProps<'float'>;
    };
}
