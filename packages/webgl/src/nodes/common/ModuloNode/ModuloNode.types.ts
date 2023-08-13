import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { ModuloNode } from './ModuloNode';

export interface IModuloNodeInputs {
    [key: string]: Input<'float', ModuloNode>;
    a: Input<'float', ModuloNode>;
    b: Input<'float', ModuloNode>;
}

export interface IModuloNodeOutputs {
    [key: string]: Output<'float', ModuloNode>;
    result: Output<'float', ModuloNode>;
}

export interface IModuloNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<'float'>;
        b?: IInputProps<'float'>;
    };
    outputs?: {
        result?: IOutputProps<'float'>;
    };
}
