import { Type } from '@thi.ng/shader-ast';
import { BaseNode } from '../../nodes/BaseNode/BaseNode';

export interface IShaderProps {
    gl: WebGL2RenderingContext;
    node: BaseNode<'uvec3'>;
}
