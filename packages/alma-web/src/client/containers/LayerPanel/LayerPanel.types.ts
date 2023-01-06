import { Layer } from 'alma-webgl';
import { MouseEventHandler } from 'react';

export interface ILayerItemProps {
    icon: string;
    name: string;
    active: boolean;
    onClick?: MouseEventHandler;
}

export interface ILayerPanelProps {
    layers: Layer[];
}
