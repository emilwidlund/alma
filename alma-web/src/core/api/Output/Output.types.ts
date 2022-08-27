import { IPortProps, IPortSerialized } from '../Port/Port.types';

export interface IOutputSerialized<TValue, TValueType> extends IPortSerialized<TValue, TValueType> {}

export interface IOutputProps<TValue, TValueType> extends IPortProps<TValue, TValueType> {}
