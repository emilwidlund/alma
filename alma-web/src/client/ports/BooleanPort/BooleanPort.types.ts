import * as Boolean from 'color';

import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';

export type IBooleanInputSerialized = IInputSerialized<boolean, ValueType.BOOLEAN>
export type IBooleanOutputSerialized = IOutputSerialized<boolean, ValueType.BOOLEAN>
