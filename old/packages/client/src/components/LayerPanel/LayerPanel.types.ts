import { Layer } from '@usealma/types';

export type LayerPanelProps = {
    layers: Layer[];
};

export type LayerItemProps = {
    layerId: string;
    index: number;
    active: boolean;
    onClick?: React.MouseEventHandler;
};
