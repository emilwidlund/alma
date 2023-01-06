import { LayerType } from 'alma-webgl';
import * as React from 'react';

import { Icon } from '../../components/Icon/Icon';
import { layerPanelItemNameStyles, layerPanelItemWrapperStyles, layerPanelWrapperStyles } from './LayerPanel.styles';
import { ILayerItemProps, ILayerPanelProps } from './LayerPanel.types';

export const LayerItem = ({ icon, name, active, onClick }: ILayerItemProps) => {
    return (
        <div className={layerPanelItemWrapperStyles(active)} onClick={onClick}>
            <Icon name={icon} size={18} outlined />
            <span className={layerPanelItemNameStyles}>{name}</span>
        </div>
    );
};

export const LayerPanel = ({ layers }: ILayerPanelProps) => {
    const [selectedLayerIndex, setSelectedLayerIndex] = React.useState(-1);

    const selectedLayer = React.useMemo(
        () => (selectedLayerIndex > -1 ? layers[selectedLayerIndex] : undefined),
        [selectedLayerIndex, layers]
    );

    return (
        <div className={layerPanelWrapperStyles}>
            {selectedLayer && (
                <div>
                    <h4>{selectedLayer.name}</h4>
                </div>
            )}
            <div>
                {layers.map((layer, index) => (
                    <LayerItem
                        key={layer.id}
                        name={layer.name}
                        icon={layer.type === LayerType.CIRCUIT ? 'route' : 'code'}
                        active={selectedLayerIndex === index}
                        onClick={() => setSelectedLayerIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};
