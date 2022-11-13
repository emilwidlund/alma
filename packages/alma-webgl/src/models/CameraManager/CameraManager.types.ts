export type TextureResolver = () => Promise<TexImageSource>;

export interface ICameraManagerProps {
    onInit?(): Promise<void> | void;
    textureResolver: TextureResolver;
}
