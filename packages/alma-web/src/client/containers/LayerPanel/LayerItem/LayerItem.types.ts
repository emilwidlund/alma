import { MouseEventHandler } from 'react';

export interface ILayerItemProps {
    icon: string;
    name: string;
    active: boolean;
    onClick?: MouseEventHandler;
}
