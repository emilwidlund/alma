import * as React from 'react';

import { Icon } from '../../../components/Icon/Icon';
import { layerPanelItemNameStyles, layerPanelItemWrapperStyles } from './LayerItem.styles';
import { ILayerItemProps } from './LayerItem.types';

export const LayerItem = ({ icon, name, active, onClick }: ILayerItemProps) => {
    return (
        <div className={layerPanelItemWrapperStyles(active)} onClick={onClick}>
            <Icon name={icon} size={18} outlined />
            <span className={layerPanelItemNameStyles}>{name}</span>
        </div>
    );
};
