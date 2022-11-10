import { Type } from '@thi.ng/shader-ast';
import { Connection, Output } from 'alma-graph';

export interface Point {
    x: number;
    y: number;
}

export interface IConnectionProps<TType extends Type> {
    output?: Output<TType>;
    point?: Point;
    connection?: Connection<TType>;
}
