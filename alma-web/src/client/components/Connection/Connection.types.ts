import { Connection } from '../../../core/api/Connection/Connection';
import { Output } from '../../../core/api/Port';

export interface Point {
    x: number;
    y: number;
}

export interface IConnectionProps {
    output?: Output;
    point?: Point;
    connection?: Connection;
}
