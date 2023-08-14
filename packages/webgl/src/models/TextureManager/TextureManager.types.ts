export type TextureResolver = (uri?: string) => TexImageSource | Promise<TexImageSource>;

export interface ITextureManagerProps {
    textureResolver: TextureResolver;
}
