import * as Boolean from 'color';

import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';

export interface IBooleanInputSerialized extends IInputSerialized<Boolean, ValueType.BOOLEAN> {}
export interface IBooleanOutputSerialized extends IOutputSerialized<Boolean, ValueType.BOOLEAN> {}
