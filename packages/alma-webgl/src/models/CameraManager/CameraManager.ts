import { TextureFilter, TextureRepeat } from '@thi.ng/webgl';
import { makeObservable, observable, action } from 'mobx';

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
    /** Initialization Flag */
    public initialized = false;
    /** On Initialize Callback */
    private onInit?: () => Promise<void> | void;

    constructor(context: WebGLContext, props: ICameraManagerProps) {
        this.context = context;
        this.textureResolver = props.textureResolver;
        this.texture = new Texture(context.ctx);
        this.onInit = props.onInit;

        makeObservable(this, {
            texture: observable,
            initialized: observable,
            init: action
        });
    }

    /** Initializes the Camera Manager */
    public async init(): Promise<void> {
        await this.onInit?.();
        this.initialized = true;
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
}
