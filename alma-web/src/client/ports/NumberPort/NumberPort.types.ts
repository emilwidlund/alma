import { IInputProps, IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputProps, IOutputSerialized } from '../../../core/api/Output/Output.types';
import { Optional } from '../../../core/api/types/helpers';
import { ValueType } from '../../lib/types';

interface INumberPortSerialized {
    min: number;
    max: number;
    step: number;
}

export interface INumberInputSerialized extends INumberPortSerialized, IInputSerialized<number, ValueType> {}
export interface INumberOutputSerialized extends INumberPortSerialized, IOutputSerialized<number, ValueType> {}

interface INumberPortProps {
    min?: number;
    max?: number;
    step?: number;
}

export interface INumberInputProps
    extends INumberPortProps,
        Optional<IInputProps<number, ValueType.NUMBER>, 'id' | 'name' | 'value'> {}
export interface INumberOutputProps
    extends INumberPortProps,
        Optional<IOutputProps<number, ValueType.NUMBER>, 'id' | 'name' | 'value'> {}
