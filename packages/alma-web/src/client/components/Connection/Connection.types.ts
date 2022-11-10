import { Connection, Output } from 'alma-graph';

export interface Point {
    x: number;
    y: number;
}

export interface IConnectionProps {
    output?: Output<any>;
    point?: Point;
    connection?: Connection<any>;
}
