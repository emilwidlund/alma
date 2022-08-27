import { clamp, lerp, degreesToRadians, radiansToDegrees } from './utils';

describe('Utils', () => {
    it('should clamp correctly', () => {
        expect(clamp(1, 2, 5)).toEqual(2);
        expect(clamp(10, 2, 5)).toEqual(5);
        expect(clamp(3, 2, 5)).toEqual(3);
    });

    it('should lerp correctly', () => {
        expect(lerp(0, 10, 0)).toEqual(0);
        expect(lerp(0, 10, 0.5)).toEqual(5);
        expect(lerp(0, 10, 1)).toEqual(10);
    });

    it('should convert from degrees to radians', () => {
        expect(degreesToRadians(90)).toEqual(Math.PI / 2);
    });

    it('should convert from radians to degrees', () => {
        expect(radiansToDegrees(Math.PI / 2)).toEqual(90);
    });
});
