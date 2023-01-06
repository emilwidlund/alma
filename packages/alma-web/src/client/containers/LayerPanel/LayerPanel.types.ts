export interface ILayerItemProps {
    id: string;
    icon: string;
    name: string;
}

export interface ILayerPanelProps {
    items: ILayerItemProps[];
}
