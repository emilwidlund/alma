import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Schematic } from '../../components/Schematic/Schematic';
import { NodeContainer } from '../NodeContainer/NodeContainer';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { Connection } from '../../components/Connection/Connection';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { Artboard } from '../../components/Artboard/Artboard';

export const SchematicContainer = observer(() => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const schematic = useSchematic();
    const { onMouseMove, mousePosition } = useMousePosition();

    const onMouseUp = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            schematic.setConnectionDraft();
        },
        [schematic]
    );

    const onClick = React.useCallback(
        (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            if (svgRef.current === e.target) {
                schematic.setSelectedNode();
            }
        },
        [schematic]
    );

    return (
        <Schematic onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <Artboard context={schematic.context} />

            {Array.from(schematic.context.nodes.values()).map(node => (
                <NodeContainer key={node.id} node={node} />
            ))}

            <svg ref={svgRef} id="connections" width="100%" height="100%" onClick={onClick}>
                {Array.from(schematic.context.connections.values()).map(connection => (
                    <Connection key={connection.id} connection={connection} />
                ))}

                {schematic.connectionDraft && <Connection output={schematic.connectionDraft} point={mousePosition} />}
            </svg>
        </Schematic>
    );
});
