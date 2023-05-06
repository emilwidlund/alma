import { LayerType } from 'alma-webgl';
import * as React from 'react';

import { LayerItem } from './LayerItem/LayerItem';
import { layerPanelWrapperStyles, layerPanelItemListStyles } from './LayerPanel.styles';
import { ILayerPanelProps } from './LayerPanel.types';
import { LayerPreview } from './LayerPreview/LayerPreview';

export const LayerPanel = ({ layers }: ILayerPanelProps) => {
    const [selectedLayerIndex, setSelectedLayerIndex] = React.useState(0);

    const selectedLayer = React.useMemo(
        () => (selectedLayerIndex > -1 ? layers[selectedLayerIndex] : undefined),
        [selectedLayerIndex, layers]
    );

    return (
        <div className={layerPanelWrapperStyles}>
            <LayerPreview layer={selectedLayer} />
            <div className={layerPanelItemListStyles}>
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
