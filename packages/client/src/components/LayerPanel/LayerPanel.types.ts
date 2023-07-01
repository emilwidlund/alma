import { Layer } from '@/../types/build';

export type LayerItemProps = {
    layer: Layer;
    index: number;
    active: boolean;
    onClick?: React.MouseEventHandler;
};
