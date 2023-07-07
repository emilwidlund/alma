import { Texture } from '@thi.ng/webgl';
import { makeObservable, observable, action, computed } from 'mobx';

import { Circuit } from '../Circuit/Circuit';
import { TextureResolver } from '../TextureManager/TextureManager.types';
import { ICameraManagerProps } from './CameraManager.types';

export class CameraManager {
    /** Associated Circuit */
    public circuit: Circuit;
    /** WebGL Texture Id */
    public textureId: string;
    /** WebGL Texture */
    public texture: Texture;
    /** Camera Texture Resolver */
    public textureResolver: TextureResolver;
    /** On Initialize Callback */
    private onInit?: () => Promise<void> | void;
    /** Frames per second */
    private fps = 25;
    /** Animation Frame Identifier */
    private frameId?: number;

    constructor(circuit: Circuit, props: ICameraManagerProps) {
        this.circuit = circuit;
        this.textureResolver = props.textureResolver;
        this.onInit = props.onInit;

        const [textureId, texture] = this.circuit.textureManager.create();
        this.textureId = textureId;
        this.texture = texture;

        makeObservable(this, {
            texture: observable,
            initialized: computed,
            start: action
        });
    }

    /** Indicates if the Camera Manager is initialized */
    public get initialized(): boolean {
        return !!this.frameId;
    }

    /** Initializes the Camera Manager */
    public async start(): Promise<void> {
        await this.onInit?.();

        setInterval(() => {
            this.frameId = requestAnimationFrame(this.resolve.bind(this));
        }, 1000 / this.fps);
    }

    /** Resolves the camera texture */
    public async resolve(): Promise<Texture> {
        const image = await this.textureResolver();

        this.circuit.textureManager.update(this.textureId, image);

        return this.texture;
    }

    /** Dispose the Camera Manager */
    public dispose(): this {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }

        return this;
    }

    /** Resets Camera Manager */
    public reset(): void {
        this.dispose().start();
    }
}
