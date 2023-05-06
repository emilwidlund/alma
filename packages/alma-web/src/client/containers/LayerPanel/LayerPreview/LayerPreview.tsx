import * as React from 'react';

import { Button } from '../../../components/Button/Button';
import { Heading } from '../../../components/Heading/Heading';
import { Icon } from '../../../components/Icon/Icon';
import { Size } from '../../../types';
import { LayerProperty } from '../LayerProperty/LayerProperty';
import { layerPanelPreviewStyles } from './LayerPreview.styles';
import { ILayerPreviewProps } from './LayerPreview.types';

const mockedProperties = [
    {
        name: 'Vector Field',
        icon: 'hive',
        description: 'Access to the layer below in the hierarchy.',
        type: 'vec2',
        uniformName: 'vectorField',
        value: []
    },
    {
        name: 'Audio Source',
        icon: 'graphic_eq',
        description: 'Access to the layer below in the hierarchy.',
        type: 'sampler2D',
        uniformName: 'audioSource0',
        value: []
    },
    {
        name: 'Composition',
        icon: 'layers',
        description: 'Access to the layer below in the hierarchy.',
        type: 'sampler2D',
        uniformName: 'inputLayer',
        value: []
    }
];

export const LayerPreview = ({ layer }: ILayerPreviewProps) => {
    if (!layer) {
        return (
            <div className={layerPanelPreviewStyles}>
                <Icon name="face" />
                <Heading size={Size.SM}>Select a layer</Heading>
            </div>
        );
    }

    return (
        <div className={layerPanelPreviewStyles}>
            <Heading size={Size.SM}>{layer.name}</Heading>
            <Heading size={Size.XS} color="var(--text-neutral-color)" marginTop={0} marginBottom={32}>
                {layer.type}
            </Heading>
            <Button label="Add Input" />
            {mockedProperties.map(property => (
                <LayerProperty property={property} />
            ))}
        </div>
    );
};
