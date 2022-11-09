import { action, autorun, makeObservable, observable } from 'mobx';

import { RendererCanvasContext, RendererType } from './Renderer.types';

export class Renderer<TType extends RendererType> {
    /** Renderer Type */
    @observable
    type: TType;

    /** Canvas Element */
    @observable
    canvas: HTMLCanvasElement;

    /** Canvas Width */
    @observable
    width = 500;

    /** Canvas Height */
    @observable
    height = 400;

    constructor(type: TType) {
        this.type = type;
        this.canvas = document.createElement('canvas');

        makeObservable(this);

        /** React to dimension changes */
        autorun(() => {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        });
    }

    /** Returns the canvas context */
    public get context(): RendererCanvasContext<TType> {
        let context!: RendererCanvasContext<TType> | null;

        switch (this.type) {
            case RendererType.CANVAS:
                context = this.canvas.getContext('2d') as RendererCanvasContext<TType>;
                break;
            case RendererType.WEBGL:
                context = this.canvas.getContext('webgl') as RendererCanvasContext<TType>;
                break;
        }

        if (!context) {
            throw new Error(`Context could not be retrieved from canvas element`);
        }

        return context;
    }

    /** Resizes Renderer */
    @action
    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
