import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Artboard } from '../../components/Artboard/Artboard';
import { BooleanControl } from '../../components/Control/BooleanControl/BooleanControl';
import { NumberControl } from '../../components/Control/NumberControl/NumberControl';
import { TypeControl } from '../../components/Control/TypeControl/TypeControl';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { Panel } from '../../components/Panel/Panel';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
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
        const circuit = useCircuit();
        const inputs = circuit.selectedNode?.inputs;

        const inputControls = Object.values(inputs || [])
            .filter(input => !input.connected)
            .map(input => {
                switch (input.type) {
                    case 'float':
                        return <NumberControl key={input.id} port={input} />;
                    case 'bool':
                        return <BooleanControl key={input.id} port={input} />;
                }
            })
            .filter(Boolean);

        return (
            <div className={propertyPanelWrapperStyles}>
                <Artboard ref={ref} size={{ width: 300, height: 200 }} />
                {circuit.selectedNode && (
                    <Panel className={propertyPanelInfoStyles}>
                        <Icon
                            // @ts-ignore
                            name={circuit.selectedNode.constructor.icon}
                            size={36}
                            color={getComputedStyle(document.documentElement).getPropertyValue('--accent-color')}
                            outlined
                        />
                        <Heading className={propertyPanelInfoHeadingStyles} size={Size.SM}>
                            {circuit.selectedNode.name}
                        </Heading>
                        <p className={propertyPanelInfoParagraphStyles}>
                            {/* @ts-ignore */}
                            {circuit.selectedNode.constructor.description}
                        </p>
                    </Panel>
                )}
                {circuit.selectedNode && (!!inputControls.length || circuit.selectedNode.data.type) && (
                    <Panel className={propertyPanelPortsContainerStyles}>
                        {circuit.selectedNode.data.type && <TypeControl node={circuit.selectedNode} />}
                        {!!inputControls.length && inputControls}
                    </Panel>
                )}
            </div>
        );
    })
);
