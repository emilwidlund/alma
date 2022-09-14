import { BaseNode } from '~models/nodes/BaseNode/BaseNode';

export interface IShaderProps<T> {
    gl: WebGL2RenderingContext;
    node: BaseNode<T>;
}
