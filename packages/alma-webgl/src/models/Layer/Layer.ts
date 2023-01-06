import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { Circuit } from '../Circuit/Circuit';
import { ILayerProps, LayerContext, LayerType } from './Layer.types';

export class Layer<T extends LayerType = LayerType.CIRCUIT> {
    /** Layer Identifier */
    id: string;
    /** Layer Name */
    name: string;
    /** Layer Type */
    type: T;
    /** Layer Context */
    context: LayerContext;

    constructor(props: ILayerProps) {
        const properties = _.defaults(props, {
            id: uuid(),
            name: props.context instanceof Circuit ? props.context.name : 'Untitled',
            type: LayerType.CIRCUIT
        });

        this.id = properties.id;
        this.name = properties.name;
        this.type = properties.type as T;
        this.context = properties.context;
    }
}
