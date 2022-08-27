import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Artboard } from '../../components/Artboard/Artboard';
import { Panel } from '../../components/Panel/Panel';
import { ResizeHandlePosition } from '../../components/Panel/Panel.types';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { ValueType } from '../../../core/api/types/values';
import { NumberControl } from '../../components/Control/NumberControl/NumberControl';
import { NumberInput, NumberOutput } from '../../../core/api/Port/NumberPort/NumberPort';
import { Heading } from '../../components/Heading/Heading';
import { Size } from '../../types';

export const PropertyPanel = observer(() => {
    const schematic = useSchematic();

    const inputControls = React.useMemo(() => {
        return Object.values(schematic.selectedNode?.inputs || []).map(input => {
            switch (input.type) {
                case ValueType.NUMBER:
                    return <NumberControl key={input.id} port={input as NumberInput<never>} />;
            }
        });
    }, [schematic]);

    const outputControls = React.useMemo(() => {
        return Object.values(schematic.selectedNode?.outputs || []).map(output => {
            switch (output.type) {
                case ValueType.NUMBER:
                    return <NumberControl key={output.id} port={output as NumberOutput<never>} />;
            }
        });
    }, [schematic]);

    return (
        <Panel
            resizeHandlePosition={ResizeHandlePosition.LEFT}
            defaultSize={{ width: 300, height: 0 }}
            header={<h3>{schematic.selectedNode?.name}</h3>}
        >
            <Heading size={Size.XS}>Inputs</Heading>
            {inputControls}

            <Heading size={Size.XS}>Outputs</Heading>
            {outputControls}
        </Panel>
    );
});
