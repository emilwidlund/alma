import { TextureFilter, TextureRepeat } from '@thi.ng/webgl';
import { makeObservable, observable, action, computed } from 'mobx';

import { Texture } from '../Texture/Texture';
import { WebGLContext } from '../WebGLContext/WebGLContext';
import { ICameraManagerProps, TextureResolver } from './CameraManager.types';

export class CameraManager {
    /** WebGL Context */
    public context: WebGLContext;
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

    constructor(context: WebGLContext, props: ICameraManagerProps) {
        this.context = context;
        this.textureResolver = props.textureResolver;
        this.texture = new Texture(context.ctx);
        this.onInit = props.onInit;

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
        this.texture.configure({
            image: await this.textureResolver(),
            flip: true,
            filter: TextureFilter.LINEAR,
            wrap: TextureRepeat.CLAMP
        });

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
