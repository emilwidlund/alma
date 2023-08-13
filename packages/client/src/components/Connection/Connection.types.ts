import { Connection, Output } from '@usealma/graph';

export interface Point {
    x: number;
    y: number;
}

export interface IConnectionProps {
    output?: Output<any>;
    point?: Point;
    connection?: Connection<any>;
}
