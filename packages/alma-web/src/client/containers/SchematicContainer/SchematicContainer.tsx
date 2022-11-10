import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Artboard } from '../../components/Artboard/Artboard';
import { Connection } from '../../components/Connection/Connection';
import { Schematic } from '../../components/Schematic/Schematic';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { NodeContainer } from '../NodeContainer/NodeContainer';

export const SchematicContainer = observer(
    React.forwardRef<HTMLCanvasElement>((_, ref) => {
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
                <Artboard ref={ref} />

                {Array.from(schematic.context?.nodes.values() || []).map(node => (
                    <NodeContainer key={node.id} node={node} />
                ))}

                <svg ref={svgRef} id="connections" width="100%" height="100%" onClick={onClick}>
                    {Array.from(schematic.context?.connections.values() || []).map(connection => (
                        <Connection key={connection.id} connection={connection} />
                    ))}

                    {schematic.connectionDraft && (
                        <Connection output={schematic.connectionDraft} point={mousePosition} />
                    )}
                </svg>
            </Schematic>
        );
    })
);
