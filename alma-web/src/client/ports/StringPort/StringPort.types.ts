import * as String from 'color';

import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';

export type IStringInputSerialized = IInputSerialized<string, ValueType.STRING>
export type IStringOutputSerialized = IOutputSerialized<string, ValueType.STRING>
