import { BaseNode } from '~models/nodes/BaseNode/BaseNode';

export abstract class ValueNode<TValue, TLit> extends BaseNode<TLit> {
    /** Node's Value */
    abstract value: TValue;
}
