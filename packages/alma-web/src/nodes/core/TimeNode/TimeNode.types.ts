import { INodeProps } from '../../../../../alma-graph/src/core/Node/Node.types';
import { Output } from '../../../../../alma-graph/src/core/Output/Output';
import { IOutputProps } from '../../../../../alma-graph/src/core/Output/Output.types';
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
