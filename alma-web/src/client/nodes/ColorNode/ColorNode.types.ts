import type { INodeData, INodeProps, INodeSerialized } from '../../../core/api/Node/Node.types';
import type { ColorOutput } from '../../ports/ColorPort/ColorPort';
import type { IColorOutputSerialized } from '../../ports/ColorPort/ColorPort.types';
import type { NumberInput } from '../../ports/NumberPort/NumberPort';
import type { INumberInputSerialized } from '../../ports/NumberPort/NumberPort.types';
import type { ColorNode } from './ColorNode';

export interface IColorNodeInputs {
    [index: string]: NumberInput<ColorNode>;
    red: NumberInput<ColorNode>;
    green: NumberInput<ColorNode>;
    blue: NumberInput<ColorNode>;
    alpha: NumberInput<ColorNode>;
}

export interface IColorNodeOutputs {
    [index: string]: ColorOutput<ColorNode>;
    out: ColorOutput<ColorNode>;
}

export interface IColorNodeSerializedInputs {
    [index: string]: INumberInputSerialized;
    red: INumberInputSerialized;
    green: INumberInputSerialized;
    blue: INumberInputSerialized;
    alpha: INumberInputSerialized;
}

export interface IColorNodeSerializedOutputs {
    [index: string]: IColorOutputSerialized;
    out: IColorOutputSerialized;
}

export interface IColorNodeData extends INodeData {}

export interface IColorNodeSerialized
    extends INodeSerialized<IColorNodeSerializedInputs, IColorNodeSerializedOutputs> {}

export interface IColorNodeProps extends INodeProps<IColorNodeSerialized> {}
