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

export const fromCircuitCartesianPoint = (circuitSize: { width: number; height: number }, x: number, y: number) =>
    fromCartesianPoint(circuitSize.width, circuitSize.height, x, y);

export const toCircuitCartesianPoint = (circuitSize: { width: number; height: number }, x: number, y: number) =>
    toCartesianPoint(circuitSize.width, circuitSize.height, x, y);
