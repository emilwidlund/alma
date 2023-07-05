import { Texture, TextureFilter, TextureRepeat } from '@thi.ng/webgl';
import { action, makeObservable, observable } from 'mobx';

import { randomHash } from '../../utils/random/random';
import { Circuit } from '../Circuit/Circuit';
import { ITextureManagerProps, TextureResolver } from './TextureManager.types';

export class TextureManager {
    /** Associated Circuit */
    public circuit: Circuit;
    /** Textures */
    public textures: Map<string, Texture>;
    /** Texture Resolver */
    public textureResolver: TextureResolver;

    constructor(circuit: Circuit, props: ITextureManagerProps) {
        this.circuit = circuit;
        this.textures = new Map();
        this.textureResolver = props.textureResolver;

        makeObservable(this, {
            textures: observable,
            create: action,
            update: action
        });
    }

    /** Creates a new Texture */
    public create(): [string, Texture] {
        const id = randomHash(8);

        const texture = new Texture(this.circuit.ctx, undefined, {
            image: window.Image ? new Image() : new Float64Array(),
            flip: true,
            filter: TextureFilter.NEAREST,
            wrap: TextureRepeat.REPEAT
        });

        this.textures.set(id, texture);

        return [id, texture];
    }

    /** Update a Texture */
    public async update(id: string, textureSource: TexImageSource) {
        const texture = this.textures.get(id);

        if (texture) {
            texture.configure({
                image: textureSource,
                flip: true,
                filter: TextureFilter.NEAREST,
                wrap: TextureRepeat.REPEAT
            });

            this.circuit.setUniform(`${id}AspectRatio`, [textureSource.width / textureSource.height]);
        }
    }
}
