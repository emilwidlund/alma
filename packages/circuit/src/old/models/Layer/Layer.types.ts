import { IContextSerialized } from '@usealma/graph';

import { Circuit } from '../Circuit/Circuit';

export enum LayerType {
    CIRCUIT = 'CIRCUIT',
    SOURCE = 'SOURCE'
}

export type LayerContext = Circuit | string;

export type ILayerContextSerialized = IContextSerialized | string;

export interface ILayerProps {
    id?: string;
    name?: string;
    type?: LayerType;
    context: LayerContext;
}

export interface ILayerSerialized {
    id: string;
    name: string;
    type: LayerType;
    context: ILayerContextSerialized;
}
