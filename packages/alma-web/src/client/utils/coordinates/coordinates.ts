export const getCartesianPoint = (width: number, height: number, x: number, y: number) => {
    const midWidth = width / 2;
    const midHeight = height / 2;
    const cartesianX = midWidth + x;
    const cartesianY = midHeight + y;

    return { x: cartesianX, y: cartesianY };
};
