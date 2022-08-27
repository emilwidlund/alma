import * as Color from 'color';

import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';

export interface IColorInputSerialized extends IInputSerialized<Color, ValueType.COLOR> {}
export interface IColorOutputSerialized extends IOutputSerialized<Color, ValueType.COLOR> {}
