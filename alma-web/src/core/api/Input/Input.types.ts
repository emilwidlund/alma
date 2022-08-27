import { IPortProps, IPortSerialized } from '../Port/Port.types';

export interface IInputSerialized<TValue, TValueType> extends IPortSerialized<TValue, TValueType> {}

export interface IInputProps<TValue, TValueType> extends IPortProps<TValue, TValueType> {}
