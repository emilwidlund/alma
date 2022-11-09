import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';
import { Vector2 } from '../../lib/Vector2/Vector2';

export type Vector2SerializedValue = [number, number];

export type IVector2InputSerialized = IInputSerialized<Vector2, ValueType.VECTOR2>
export type IVector2OutputSerialized = IOutputSerialized<Vector2, ValueType.STRING>
