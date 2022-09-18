import { Type } from '@thi.ng/shader-ast';
import { BaseNode } from '../BaseNode/BaseNode';

export abstract class ValueNode<TValue, TType extends Type> extends BaseNode<TType> {
    /** Node's Value */
    abstract value: TValue;
}
