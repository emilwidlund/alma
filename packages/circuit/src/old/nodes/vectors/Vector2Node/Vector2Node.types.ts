import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { Vector2Node } from './Vector2Node';

export interface IVector2NodeInputs {
    [key: string]: Input<'float', Vector2Node>;
    x: Input<'float', Vector2Node>;
    y: Input<'float', Vector2Node>;
}

export interface IVector2NodeOutputs {
    [key: string]: Output<'vec2', Vector2Node>;
    vector2: Output<'vec2', Vector2Node>;
}

export interface IVector2NodeProps extends INodeProps {
    inputs?: {
        x?: IInputProps<'float'>;
        y?: IInputProps<'float'>;
    };
    outputs?: {
        vector2?: IOutputProps<'vec2'>;
    };
}
