import { Optional } from '../types/helpers';

export interface IPortSerialized<TValue, TValueType> {
    id: string;
    name: string;
    defaultValue: TValue;
    value: TValue;
    type: TValueType;
}

export type IPortProps<TValue, TValueType> = Optional<IPortSerialized<TValue, TValueType>, 'id' | 'name' | 'value'>
