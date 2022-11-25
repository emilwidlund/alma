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

        if (!circuit.selectedNodes) {
            return null;
        }

        const [selectedCandidate, ...rest] = circuit.selectedNodes;
        const shouldRenderInputs = selectedCandidate && rest.length === 0;

        const inputs = selectedCandidate?.inputs;

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
                {shouldRenderInputs && (
                    <Panel className={propertyPanelInfoStyles}>
                        <Icon
                            // @ts-ignore
                            name={selectedCandidate.constructor.icon}
                            size={36}
                            color={getComputedStyle(document.documentElement).getPropertyValue('--accent-color')}
                            outlined
                        />
                        <Heading className={propertyPanelInfoHeadingStyles} size={Size.SM}>
                            {selectedCandidate.name}
                        </Heading>
                        <p className={propertyPanelInfoParagraphStyles}>
                            {/* @ts-ignore */}
                            {selectedCandidate.constructor.description}
                        </p>
                    </Panel>
                )}
                {selectedCandidate && (!!inputControls.length || selectedCandidate.data.type) && (
                    <Panel className={propertyPanelPortsContainerStyles}>
                        {selectedCandidate.data.type && <TypeControl node={selectedCandidate} />}
                        {!!inputControls.length && inputControls}
                    </Panel>
                )}
            </div>
        );
    })
);
