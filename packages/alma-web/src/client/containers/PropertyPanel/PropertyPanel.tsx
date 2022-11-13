import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Artboard } from '../../components/Artboard/Artboard';
import { NumberControl } from '../../components/Control/NumberControl/NumberControl';
import { TypeControl } from '../../components/Control/TypeControl/TypeControl';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { Panel } from '../../components/Panel/Panel';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { Size } from '../../types';
import {
    propertyPanelInfoHeadingStyles,
    propertyPanelInfoStyles,
    propertyPanelPortsContainerStyles,
    propertyPanelWrapperStyles,
    propertyPanelInfoParagraphStyles
} from './PropertyPanel.styles';

export const PropertyPanel = observer(
    React.forwardRef<HTMLCanvasElement>((_, ref) => {
        const schematic = useSchematic();

        const inputControls = React.useMemo(() => {
            return Object.values(schematic.selectedNode?.inputs || [])
                .filter(input => !input.connected)
                .map(input => {
                    switch (input.type) {
                        case 'float':
                            return <NumberControl key={input.id} port={input} />;
                    }
                })
                .filter(Boolean);
        }, [schematic]);

        return (
            <div className={propertyPanelWrapperStyles}>
                <Artboard ref={ref} size={{ width: 300, height: 200 }} />
                {schematic.selectedNode && (
                    <Panel className={propertyPanelInfoStyles}>
                        <Icon
                            // @ts-ignore
                            name={schematic.selectedNode.constructor.icon}
                            size={36}
                            color={getComputedStyle(document.documentElement).getPropertyValue('--accent-color')}
                            outlined
                        />
                        <Heading className={propertyPanelInfoHeadingStyles} size={Size.SM}>
                            {schematic.selectedNode.name}
                        </Heading>
                        <p className={propertyPanelInfoParagraphStyles}>
                            {/* @ts-ignore */}
                            {schematic.selectedNode.constructor.description}
                        </p>
                    </Panel>
                )}
                {schematic.selectedNode && !!inputControls.length && (
                    <Panel className={propertyPanelPortsContainerStyles}>
                        {schematic.selectedNode.data.type && <TypeControl node={schematic.selectedNode} />}
                        {!!inputControls.length && inputControls}
                    </Panel>
                )}
            </div>
        );
    })
);
