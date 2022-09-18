import { Term, Type } from '@thi.ng/shader-ast';
import { ShaderContext } from '../../core/ShaderContext/ShaderContext';

export abstract class BaseNode<T extends Type> {
    /** Output Value */
    abstract output: Term<T>;

    public abstract build(context: ShaderContext): this;
}
