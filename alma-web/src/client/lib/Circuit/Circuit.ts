import { makeObservable, observable } from 'mobx';

import type { ICircuitProps } from './Circuit.types';
import { Context } from '../../../core/api/Context/Context';
import { INodesCollection, Nodes } from '../../nodes';
import { Renderer } from '../Renderer/Renderer';
import type { RendererType } from '../Renderer/Renderer.types';

export class Circuit<TRendererType extends RendererType = RendererType> extends Context<INodesCollection> {
    @observable
    renderer: Renderer<TRendererType>;

    constructor(props: ICircuitProps<TRendererType>) {
        super(Nodes, props);

        this.renderer = new Renderer(props.rendererType);

        makeObservable(this);
    }
}
