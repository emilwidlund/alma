import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Artboard } from '../../components/Artboard/Artboard';
import { NumberControl } from '../../components/Control/NumberControl/NumberControl';
import { Heading } from '../../components/Heading/Heading';
import { Icon } from '../../components/Icon/Icon';
import { Panel } from '../../components/Panel/Panel';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { Size } from '../../types';
import { propertyPanelInfoStyles, propertyPanelWrapperStyles } from './PropertyPanel.styles';

export const PropertyPanel = observer(
    React.forwardRef<HTMLCanvasElement>((_, ref) => {
        const schematic = useSchematic();

        const inputControls = React.useMemo(() => {
            return Object.values(schematic.selectedNode?.inputs || [])
                .map(input => {
                    switch (input.type) {
                        case 'float':
                            return <NumberControl key={input.id} port={input} />;
                    }
                })
                .filter(Boolean);
        }, [schematic]);

        const outputControls = React.useMemo(() => {
            return Object.values(schematic.selectedNode?.outputs || [])
                .map(output => {
                    switch (output.type) {
                        case 'float':
                            return <NumberControl key={output.id} port={output} />;
                    }
                })
                .filter(Boolean);
        }, [schematic]);

        return (
            <div className={propertyPanelWrapperStyles}>
                <Artboard ref={ref} size={{ width: 300, height: 200 }} />
                {schematic.selectedNode && (
                    <Panel className={propertyPanelInfoStyles}>
                        {/* @ts-ignore */}
                        <Icon name={schematic.selectedNode.constructor.icon} size={48} outlined />
                        <Heading size={Size.SM}>{schematic.selectedNode.name}</Heading>
                        {/* @ts-ignore */}
                        <p>{schematic.selectedNode.constructor.description}</p>
                    </Panel>
                )}
                {schematic.selectedNode && (!!inputControls.length || !!outputControls.length) && (
                    <Panel>
                        {!!inputControls.length && (
                            <>
                                <Heading size={Size.SM}>Inputs</Heading>
                                {inputControls}
                            </>
                        )}

                        {!!outputControls.length && (
                            <>
                                <Heading size={Size.SM}>Outputs</Heading>
                                {outputControls}
                            </>
                        )}
                    </Panel>
                )}
            </div>
        );
    })
);
