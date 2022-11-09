import * as Color from 'color';

import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';

export type IColorInputSerialized = IInputSerialized<Color, ValueType.COLOR>
export type IColorOutputSerialized = IOutputSerialized<Color, ValueType.COLOR>
