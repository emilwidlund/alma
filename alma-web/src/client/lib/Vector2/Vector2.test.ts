import { Vector2 } from './Vector2';

describe('Vector2', () => {
    let vector: Vector2;

    beforeEach(() => {
        vector = new Vector2(10, 20);
    });

    describe('Getter accessors', () => {
        it('should populate x & y values via constructor', () => {
            expect(vector.x).toEqual(10);
            expect(vector.y).toEqual(20);
        });

        it('should compute magnitude properly', () => {
            expect(vector.magnitude).toEqual(Math.sqrt(10 * 10 + 20 * 20));
        });

        it('should compute correct angle', () => {
            expect(vector.angle).toEqual(Math.atan2(vector.y, vector.x));
        });
    });

    describe('Static methods', () => {
        it('should create a new vector from serialized state', () => {
            const serialized = vector.toArray();
            const restored = Vector2.from(serialized);
            expect(restored.x).toBe(10);
            expect(restored.y).toBe(20);
        });

        it('should compare vectors truthfully given equal values', () => {
            const a = new Vector2(10, 100);
            const b = new Vector2(10, 100);
            expect(Vector2.equals(a, b)).toBeTruthy();
        });

        it('should compare vectors falsy given different values', () => {
            const a = new Vector2(10, 100);
            const b = new Vector2(20, 200);
            expect(Vector2.equals(a, b)).toBeFalsy();
        });

        it('should compute distance between vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(Vector2.distance(a, b)).toEqual(100.4987562112089);
        });

        it('should add vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(Vector2.add(a, b)).toEqual(new Vector2(50, 500));
        });

        it('should subtract vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(Vector2.subtract(a, b)).toEqual(new Vector2(-10, -100));
        });

        it('should multiply vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(Vector2.multiply(a, b)).toEqual(new Vector2(600, 60000));
        });

        it('should divide vectors correctly', () => {
            const a = new Vector2(30, 300);
            const b = new Vector2(2, 10);
            expect(Vector2.divide(a, b)).toEqual(new Vector2(15, 30));
        });
    });

    describe('Static getter accessors', () => {
        it('should return a vector pointing up', () => {
            expect(Vector2.UP).toEqual(new Vector2(0, 1));
        });

        it('should return a vector pointing right', () => {
            expect(Vector2.RIGHT).toEqual(new Vector2(1, 0));
        });

        it('should return a vector pointing down', () => {
            expect(Vector2.DOWN).toEqual(new Vector2(0, -1));
        });

        it('should return a vector pointing left', () => {
            expect(Vector2.LEFT).toEqual(new Vector2(-1, 0));
        });
    });

    describe('Methods', () => {
        it('should set x & y values', () => {
            expect(vector.set(5, 15).x).toEqual(5);
        });

        it('should set x value', () => {
            expect(vector.setX(10).x).toEqual(10);
        });

        it('should set y value', () => {
            expect(vector.setY(100).y).toEqual(100);
        });

        it('should set magnitude', () => {
            expect(Math.round(vector.setMagnitude(2).magnitude)).toEqual(2);
        });

        it('should compare vectors truthfully given equal values', () => {
            const a = new Vector2(1, 2);
            const b = new Vector2(1, 2);
            expect(a.equals(b)).toBeTruthy();
        });

        it('should compare vectors falsy given different values', () => {
            const a = new Vector2(1, 2);
            const b = new Vector2(2, 1);
            expect(a.equals(b)).toBeFalsy();
        });

        it('should copy vector values correctly', () => {
            const a = new Vector2(1, 2);
            const b = new Vector2(2, 1);
            expect(a.copy(b)).toEqual(new Vector2(2, 1));
        });

        it('should add vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(a.add(b)).toEqual(new Vector2(50, 500));
        });

        it('should add scalar correctly', () => {
            expect(vector.addScalar(2)).toEqual(new Vector2(12, 22));
        });

        it('should subtract vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(a.subtract(b)).toEqual(new Vector2(-10, -100));
        });

        it('should subtract scalar correctly', () => {
            expect(vector.subtractScalar(2)).toEqual(new Vector2(8, 18));
        });

        it('should multiply vectors correctly', () => {
            const a = new Vector2(20, 200);
            const b = new Vector2(30, 300);
            expect(a.multiply(b)).toEqual(new Vector2(600, 60000));
        });

        it('should multiply scalar correctly', () => {
            expect(vector.multiplyScalar(2)).toEqual(new Vector2(20, 40));
        });

        it('should divide vectors correctly', () => {
            const a = new Vector2(30, 300);
            const b = new Vector2(2, 10);
            expect(a.divide(b)).toEqual(new Vector2(15, 30));
        });

        it('should divide scalar correctly', () => {
            expect(vector.divideScalar(2)).toEqual(new Vector2(5, 10));
        });

        it('should clamp vector correctly', () => {
            const clampedMin = new Vector2(200, 220);
            const clampedMax = new Vector2(500, 600);

            const a = new Vector2(10, 250);
            const b = new Vector2(250, 10);
            const c = new Vector2(490, 700);
            const d = new Vector2(700, 490);
            const e = new Vector2(10, 10);
            const f = new Vector2(600, 700);

            expect(a.clamp(clampedMin, clampedMax)).toEqual(new Vector2(200, 250));
            expect(b.clamp(clampedMin, clampedMax)).toEqual(new Vector2(250, 220));
            expect(c.clamp(clampedMin, clampedMax)).toEqual(new Vector2(490, 600));
            expect(d.clamp(clampedMin, clampedMax)).toEqual(new Vector2(500, 490));
            expect(e.clamp(clampedMin, clampedMax)).toEqual(new Vector2(200, 220));
            expect(f.clamp(clampedMin, clampedMax)).toEqual(new Vector2(500, 600));
        });

        it('should clamp scalar correctly', () => {
            const clampedMin = 200;
            const clampedMax = 500;

            const a = new Vector2(10, 250);
            const b = new Vector2(250, 10);
            const c = new Vector2(490, 600);
            const d = new Vector2(600, 490);
            const e = new Vector2(10, 10);
            const f = new Vector2(600, 600);

            expect(a.clampScalar(clampedMin, clampedMax)).toEqual(new Vector2(200, 250));
            expect(b.clampScalar(clampedMin, clampedMax)).toEqual(new Vector2(250, 200));
            expect(c.clampScalar(clampedMin, clampedMax)).toEqual(new Vector2(490, 500));
            expect(d.clampScalar(clampedMin, clampedMax)).toEqual(new Vector2(500, 490));
            expect(e.clampScalar(clampedMin, clampedMax)).toEqual(new Vector2(200, 200));
            expect(f.clampScalar(clampedMin, clampedMax)).toEqual(new Vector2(500, 500));
        });

        it('should clamp magnitude correctly', () => {
            const clampedMin = 2;
            const clampedMax = 5;

            expect(vector.setMagnitude(1).clampMagnitude(clampedMin, clampedMax).magnitude).toEqual(clampedMin);
            expect(vector.setMagnitude(10).clampMagnitude(clampedMin, clampedMax).magnitude).toEqual(clampedMax);
        });

        it('should normalize correctly', () => {
            expect(vector.setMagnitude(10).normalize().magnitude).toEqual(1);
        });

        it('should limit magnitude correctly', () => {
            expect(vector.setMagnitude(10).limit(5).magnitude).toEqual(5);
        });

        it('should floor values correctly', () => {
            expect(vector.set(5.2, 10.3).floor()).toEqual(new Vector2(5, 10));
        });

        it('should ceil values correctly', () => {
            expect(vector.set(5.2, 10.3).ceil()).toEqual(new Vector2(6, 11));
        });

        it('should round values correctly', () => {
            expect(vector.set(5.2, 10.3).round()).toEqual(new Vector2(5, 10));
            expect(vector.set(5.8, 10.7).round()).toEqual(new Vector2(6, 11));
            expect(vector.set(5.2, 10.7).round()).toEqual(new Vector2(5, 11));
        });

        it('should compute distance to vector correctly', () => {
            expect(vector.distanceTo(new Vector2(30, 40))).toEqual(28.284271247461902);
        });

        it('should rotate by angle correctly', () => {
            expect(Vector2.RIGHT.rotate(1.2).angle).toEqual(1.2);
        });

        it('should serialize to array', () => {
            expect(vector.toArray()).toEqual([10, 20]);
        });
    });
});
