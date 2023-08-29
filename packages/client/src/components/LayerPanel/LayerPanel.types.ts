import { Layer } from '@usealma/types';

export type LayerPanelProps = {
    layers: Layer[];
};

export type LayerItemProps = {
    layer: Layer;
    index: number;
    active: boolean;
    onClick?: React.MouseEventHandler;
};
