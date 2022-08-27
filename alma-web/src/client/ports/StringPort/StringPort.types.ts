import * as String from 'color';

import { IInputSerialized } from '../../../core/api/Input/Input.types';
import { IOutputSerialized } from '../../../core/api/Output/Output.types';
import { ValueType } from '../../lib/types';

export interface IStringInputSerialized extends IInputSerialized<String, ValueType.STRING> {}
export interface IStringOutputSerialized extends IOutputSerialized<String, ValueType.STRING> {}
