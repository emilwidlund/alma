import { CIRCUIT_SIZE } from '../../constants/circuit';

export const fromCartesianPoint = (width: number, height: number, x: number, y: number) => {
    const midWidth = width / 2;
    const midHeight = height / 2;
    const cartesianX = midWidth + x;
    const cartesianY = midHeight + -y;

    return { x: cartesianX, y: cartesianY };
};

export const toCartesianPoint = (width: number, height: number, x: number, y: number) => {
    const midWidth = width / 2;
    const midHeight = height / 2;

    return { x: x - midWidth, y: -(y - midHeight) };
};

export const fromCircuitCartesianPoint = (x: number, y: number) => fromCartesianPoint(CIRCUIT_SIZE, CIRCUIT_SIZE, x, y);

export const toCircuitCartesianPoint = (x: number, y: number) => toCartesianPoint(CIRCUIT_SIZE, CIRCUIT_SIZE, x, y);
