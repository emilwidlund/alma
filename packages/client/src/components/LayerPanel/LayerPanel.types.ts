export type LayerItemProps = {
    name: string;
    type: 'GLSL' | 'Visual';
    icon: string;
    visible: boolean;
    active: boolean;
    onClick?: React.MouseEventHandler;
};

export type LayerPanelProps = {
    items: Omit<LayerItemProps, 'active'>[];
};
