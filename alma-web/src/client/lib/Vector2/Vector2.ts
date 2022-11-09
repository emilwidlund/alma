import { action, computed, makeObservable, observable } from 'mobx';

import { clamp } from '../../utils/utils';

export class Vector2 {
    /** X component */
    @observable
    x = 0;

    /** Y component */
    @observable
    y = 0;

    /** Vector's magnitude */
    @computed
    public get magnitude(): number {
        const x = this.x * this.x;
        const y = this.y * this.y;

        return Math.sqrt(x + y);
    }

    /** Vector's angle */
    @computed
    public get angle(): number {
        let angle = Math.atan2(this.y, this.x);

        if (angle < 0) angle += 2 * Math.PI;

        return angle;
    }

    /** Creates a new vector from serialized array */
    public static from([x, y]: [number, number]): Vector2 {
        return new Vector2(x, y);
    }

    /** Compares vectors */
    public static equals(a: Vector2, b: Vector2): boolean {
        const x = a.x === b.x;
        const y = a.y === b.y;

        return x && y;
    }

    /** Returns distance between vectors */
    public static distance(a: Vector2, b: Vector2): number {
        return this.subtract(a, b).magnitude;
    }

    /** Add vectors */
    public static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    /** Subtract vectors */
    public static subtract(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    /** Multiply vectors */
    public static multiply(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    /** Divide vectors */
    public static divide(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x / b.x, a.y / b.y);
    }

    /** A vector pointing up */
    public static get UP(): Vector2 {
        return new Vector2(0, 1);
    }

    /** A vector pointing right */
    public static get RIGHT(): Vector2 {
        return new Vector2(1, 0);
    }

    /** A vector pointing right */
    public static get DOWN(): Vector2 {
        return new Vector2(0, -1);
    }

    /** A vector pointing left */
    public static get LEFT(): Vector2 {
        return new Vector2(-1, 0);
    }

    constructor(x = 0, y = 0) {
        makeObservable(this);

        this.set(x, y);
    }

    /** Sets X & Y */
    @action
    public set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;

        return this;
    }

    /** Sets X */
    @action
    public setX(x: number): Vector2 {
        this.x = x;

        return this;
    }

    /** Sets Y */
    @action
    public setY(y: number): Vector2 {
        this.y = y;

        return this;
    }

    /** Sets Magnitude */
    public setMagnitude(magnitude: number): Vector2 {
        return this.normalize().multiplyScalar(magnitude);
    }

    /** Compares Vector */
    public equals(vector: Vector2): boolean {
        return Vector2.equals(this, vector);
    }

    /** Copy Vector */
    public copy({ x, y }: Vector2): Vector2 {
        return this.set(x, y);
    }

    /** Add Vector */
    @action
    public add({ x, y }: Vector2): Vector2 {
        this.x += x;
        this.y += y;

        return this;
    }

    /** Add Scalar */
    @action
    public addScalar(scalar: number): Vector2 {
        this.x += scalar;
        this.y += scalar;

        return this;
    }

    /** Subtract Vector */
    @action
    public subtract({ x, y }: Vector2): Vector2 {
        this.x -= x;
        this.y -= y;

        return this;
    }

    /** Subtract Scalar */
    @action
    public subtractScalar(scalar: number): Vector2 {
        this.x -= scalar;
        this.y -= scalar;

        return this;
    }

    /** Multiply Vector */
    @action
    public multiply({ x, y }: Vector2): Vector2 {
        this.x *= x;
        this.y *= y;

        return this;
    }

    /** Multiply Scalar */
    @action
    public multiplyScalar(scalar: number): Vector2 {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    /** Divide Vector */
    @action
    public divide({ x, y }: Vector2): Vector2 {
        this.x /= x;
        this.y /= y;

        return this;
    }

    /** Divide Scalar */
    @action
    public divideScalar(scalar: number): Vector2 {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    /** Clamp Vector */
    @action
    public clamp(min: Vector2, max: Vector2): Vector2 {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);

        return this;
    }

    /** Clamp Scalar */
    @action
    public clampScalar(min: number, max: number): Vector2 {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);

        return this;
    }

    /** Clamp Magnitude */
    public clampMagnitude(min: number, max: number): Vector2 {
        return this.setMagnitude(clamp(this.magnitude, min, max));
    }

    /** Normalize Vector */
    public normalize(): Vector2 {
        return this.divideScalar(this.magnitude || 1);
    }

    /** Limit Vector magnitude */
    public limit(limit: number): Vector2 {
        if (this.magnitude > limit) {
            this.setMagnitude(limit);
        }

        return this;
    }

    /** Floor Vector */
    @action
    public floor(): Vector2 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    }

    /** Ceil Vector */
    @action
    public ceil(): Vector2 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    }

    /** Round Vector */
    @action
    public round(): Vector2 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }

    /** Distance to vector */
    public distanceTo(to: Vector2): number {
        return Vector2.distance(this, to);
    }

    /** Rotate vector */
    public rotate(angle: number) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const x = this.x * c - this.y * s;
        const y = this.x * s + this.y * c;

        return this.set(x, y);
    }

    /** Return Vector as Array */
    public toArray(): [number, number] {
        return [this.x, this.y];
    }
}
