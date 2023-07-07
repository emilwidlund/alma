import { TextureResolver } from '../TextureManager/TextureManager.types';

export interface ICameraManagerProps {
    onInit?(): Promise<void> | void;
    textureResolver: TextureResolver;
}
