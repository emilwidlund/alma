/**
 * Clamps given value between min & max
 */
export const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
};

/**
 * Linear Interpolation
 */
export const lerp = (a: number, b: number, t: number) => {
    return (1 - t) * a + t * b;
};

/**
 * Converts degrees to radians
 */
export const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
};

/**
 * Converts radians to degrees
 */
export const radiansToDegrees = (radians: number) => {
    return radians * (180 / Math.PI);
};
