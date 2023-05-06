import * as React from 'react';

import { Heading } from '../../../components/Heading/Heading';
import { Icon } from '../../../components/Icon/Icon';
import { Size } from '../../../types';
import {
    layerPropertyDescriptionStyles,
    layerPropertyHeaderStyles,
    layerPropertyHeaderTitleStyles,
    layerPropertyMetaStyles,
    layerPropertyTypeStyles,
    layerPropertyUniformNameStyles,
    layerPropertyWrapperStyles
} from './LayerProperty.styles';
import { ILayerPropertyProps } from './LayerProperty.types';

export const LayerProperty = ({ property }: ILayerPropertyProps) => {
    return (
        <div className={layerPropertyWrapperStyles}>
            <div className={layerPropertyHeaderStyles}>
                <Icon name={property.icon} size={16} color="var(--text-light-color)" outlined />
                <Heading className={layerPropertyHeaderTitleStyles} size={Size.XS} marginTop={0} marginBottom={0}>
                    {property.name}
                </Heading>
            </div>
            <p className={layerPropertyDescriptionStyles}>{property.description}</p>
            <div className={layerPropertyMetaStyles}>
                <div className={layerPropertyTypeStyles}>
                    <span>{property.type}</span>
                </div>
                <span className={layerPropertyUniformNameStyles}>{property.uniformName}</span>
            </div>
        </div>
    );
};
