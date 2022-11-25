import { GLSLNode } from 'alma-webgl';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Connection } from '../../components/Connection/Connection';
import { Schematic } from '../../components/Schematic/Schematic';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { useGLSLModal } from '../../hooks/useGLSLModal/useGLSLModal';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { NodeContainer } from '../NodeContainer/NodeContainer';
import { schematicContainerStyles } from './SchematicContainer.styles';

export const SchematicContainer = observer(
    React.forwardRef<HTMLDivElement>((props, ref) => {
        const svgRef = React.useRef<SVGSVGElement>(null);
        const schematic = useSchematic();
        const { onMouseMove, mousePosition } = useMousePosition();
        const { open } = useGLSLModal();

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

        const handleCreateGLSLNode = React.useCallback(() => {
            if (schematic.context) {
                const node = new GLSLNode(schematic.context, { data: { glsl: '', position: { x: 0, y: 0 } } });
                open(node);
            }
        }, [schematic.context]);

        return (
            <Schematic ref={ref} className={schematicContainerStyles} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                <Toolbar>
                    <ToolbarItem label="Stream" icon="stream" onClick={handleCreateGLSLNode} />
                    <ToolbarItem label="Gesture" icon="gesture" onClick={console.log} outlined />
                    <ToolbarItem label="New Node" icon="add" onClick={console.log} cta />
                    <ToolbarItem label="Connection" icon="conversion_path" onClick={console.log} />
                    <ToolbarItem label="Fullscreen" icon="open_in_full" onClick={console.log} />
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
