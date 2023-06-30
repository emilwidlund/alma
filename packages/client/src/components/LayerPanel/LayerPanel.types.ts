import { Dispatch, SetStateAction } from 'react';

export type LayerItemProps = {
    name: string;
    type: 'FRAGMENT' | 'CIRCUIT';
    visible: boolean;
    active: boolean;
    onClick?: React.MouseEventHandler;
};

export type LayerPanelProps = {
    items: Omit<LayerItemProps, 'active'>[];
    activeLayerIndex: number;
    setActiveLayerIndex(index: number): void;
};
