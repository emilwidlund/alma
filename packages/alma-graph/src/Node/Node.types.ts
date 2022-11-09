import { Input } from '../Input/Input';
import { IInputSerialized } from '../Input/Input.types';
import { Output } from '../Output/Output';
import { IOutputSerialized } from '../Output/Output.types';

export interface INodeData {
    position: {
        x: number;
        y: number;
    };
}

export interface INodeInputs {
    [key: string]: Input<any, any>;
}
export interface INodeOutputs {
    [key: string]: Output<any, any>;
}

export interface INodeProps {
    id?: string;
    name?: string;
    data?: INodeData;
}

export interface INodeSerialized {
    id: string;
    name: string;
    type: string;
    data: INodeData;
    inputs: Record<string, IInputSerialized<any>>;
    outputs: Record<string, IOutputSerialized<any>>;
}
