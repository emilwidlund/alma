import { makeObservable, observable, action } from 'mobx';

import { Texture } from '../Texture/Texture';
import { WebGLContext } from '../WebGLContext/WebGLContext';
import { CameraTextureResolver } from './CameraManager.types';

export class CameraManager {
    /** WebGL Context */
    public context: WebGLContext;
    /** WebGL Texture */
    public texture: Texture;
    /** Camera Texture Resolver */
    public cameraTextureResolver: CameraTextureResolver;
    /** Initialization Flag */
    public initialized = false;

    constructor(context: WebGLContext, cameraTextureResolver: CameraTextureResolver) {
        this.context = context;
        this.cameraTextureResolver = cameraTextureResolver;
        this.texture = new Texture(context.ctx);

        makeObservable(this, {
            texture: observable,
            initialized: observable,
            init: action
        });
    }

    /** Initializes the Camera Manager */
    public async init(): Promise<Texture> {
        this.texture = await this.cameraTextureResolver();
        this.initialized = true;

        return this.texture;
    }
}
