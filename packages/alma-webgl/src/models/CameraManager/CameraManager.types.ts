import { Texture } from '../Texture/Texture';

export type CameraTextureResolver = () => Promise<Texture>;
