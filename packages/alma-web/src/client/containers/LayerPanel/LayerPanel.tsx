import * as React from 'react';

import { Icon } from '../../components/Icon/Icon';
import { layerPanelItemNameStyles, layerPanelItemWrapperStyles, layerPanelWrapperStyles } from './LayerPanel.styles';
import { ILayerItemProps, ILayerPanelProps } from './LayerPanel.types';

export const LayerItem = ({ icon, name }: ILayerItemProps) => {
    return (
        <div className={layerPanelItemWrapperStyles}>
            <Icon name={icon} size={18} outlined />
            <span className={layerPanelItemNameStyles}>{name}</span>
        </div>
    );
};

export const LayerPanel = ({ items }: ILayerPanelProps) => {
    return (
        <div className={layerPanelWrapperStyles}>
            {items.map(item => (
                <LayerItem key={item.id} {...item} />
            ))}
        </div>
    );
};
