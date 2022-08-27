import { Optional } from '../types/helpers';

export interface IPortSerialized<TValue, TValueType> {
    id: string;
    name: string;
    defaultValue: TValue;
    value: TValue;
    type: TValueType;
}

export interface IPortProps<TValue, TValueType>
    extends Optional<IPortSerialized<TValue, TValueType>, 'id' | 'name' | 'value'> {}
