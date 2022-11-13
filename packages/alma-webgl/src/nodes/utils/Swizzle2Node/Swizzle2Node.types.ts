import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { Swizzle2Node } from './Swizzle2Node';

export interface ISwizzle2NodeInputs {
    [key: string]: Input<'vec2', Swizzle2Node>;
    vector: Input<'vec2', Swizzle2Node>;
}

export interface ISwizzle2NodeOutputs {
    [key: string]: Output<'float', Swizzle2Node>;
    x: Output<'float', Swizzle2Node>;
    y: Output<'float', Swizzle2Node>;
}

export interface ISwizzle2NodeProps extends INodeProps {
    inputs?: {
        vector?: IInputProps<'vec2'>;
    };
    outputs?: {
        x?: IOutputProps<'float'>;
        y?: IOutputProps<'float'>;
    };
}
