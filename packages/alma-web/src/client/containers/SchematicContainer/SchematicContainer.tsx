import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Connection } from '../../components/Connection/Connection';
import { Schematic } from '../../components/Schematic/Schematic';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { NodeContainer } from '../NodeContainer/NodeContainer';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarItem } from '../Toolbar/ToolbarItem';
import { schematicContainerStyles } from './SchematicContainer.styles';

export const SchematicContainer = observer(
    React.forwardRef<HTMLDivElement>((props, ref) => {
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
            <Schematic ref={ref} className={schematicContainerStyles} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                <Toolbar>
                    <ToolbarItem icon="stream" onClick={console.log} />
                    <ToolbarItem icon="shape_line" onClick={console.log} outlined />
                    <ToolbarItem icon="add" onClick={console.log} cta />
                    <ToolbarItem icon="conversion_path" onClick={console.log} />
                    <ToolbarItem icon="open_in_full" onClick={console.log} />
                </Toolbar>

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
