import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Circuit } from '../../components/Circuit/Circuit';
import { Connection } from '../../components/Connection/Connection';
import { ContextMenuContainer } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { IPoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint.types';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { normalizeBounds } from '../../utils/bounds/bounds';
import { NodeContainer } from '../NodeContainer/NodeContainer';
import { circuitContainerStyles, circuitSelectionStyles } from './CircuitContainer.styles';
import { IConnectionsProps } from './CircuitContainer.types';

const Nodes = observer(() => {
    const circuit = useCircuit();

    return (
        <>
            {Array.from(circuit.context?.nodes.values() || []).map(node => (
                <NodeContainer key={node.id} node={node} />
            ))}
        </>
    );
});

const Connections = observer(({ mousePosition }: IConnectionsProps) => {
    const ref = React.useRef<SVGSVGElement>(null);
    const circuit = useCircuit();

    const onClick = React.useCallback(
        (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            if (ref.current === e.target) {
                circuit.setSelectedNodes([]);
            }
        },
        [circuit]
    );

    return (
        <svg ref={ref} id="connections" width="100%" height="100%" onClick={onClick}>
            {Array.from(circuit.context?.connections.values() || []).map(connection => (
                <Connection key={connection.id} connection={connection} />
            ))}

            {circuit.connectionDraft && <Connection output={circuit.connectionDraft} point={mousePosition} />}
        </svg>
    );
});

const Selection = observer(() => {
    const circuit = useCircuit();

    return circuit.selectionBounds ? (
        <div className={circuitSelectionStyles(normalizeBounds(circuit.selectionBounds))} />
    ) : null;
});

export const CircuitContainer = observer(
    React.forwardRef<HTMLDivElement>((props, ref) => {
        const circuit = useCircuit();
        const { onMouseMove: mouseMoveHandler, mousePosition } = useMousePosition();
        const [contextMenuPosition, toggleContextMenu] = React.useState<IPoint | undefined>(undefined);

        const onMouseMove = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                mouseMoveHandler(e);

                if (circuit.selectionBounds) {
                    const { x, y, width, height } = circuit.selectionBounds;

                    const bounds = {
                        x,
                        y,
                        width: width + e.movementX,
                        height: height + e.movementY
                    };

                    circuit.setSelectionBounds(bounds);
                }
            },
            [circuit, mouseMoveHandler]
        );

        const onMouseDown = React.useCallback(
            ({ nativeEvent }: React.MouseEvent<HTMLDivElement>) => {
                if ((nativeEvent.target as HTMLDivElement).id === 'connections') {
                    circuit.setSelectionBounds({ x: mousePosition.x, y: mousePosition.y, width: 0, height: 0 });
                }
            },
            [circuit, mousePosition]
        );

        const onMouseUp = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                circuit.setConnectionDraft();
                circuit.setSelectionBounds();
            },
            [circuit]
        );

        const onContextMenu = React.useCallback(
            e => {
                e.preventDefault();

                toggleContextMenu(position => {
                    if (position) {
                        return undefined;
                    } else {
                        return mousePosition;
                    }
                });
            },
            [mousePosition, toggleContextMenu]
        );

        return (
            <Circuit
                ref={ref}
                className={circuitContainerStyles}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onContextMenu={onContextMenu}
            >
                <Nodes />
                <Connections mousePosition={mousePosition} />
                <Selection />
                {!!contextMenuPosition && (
                    <ContextMenuContainer
                        position={contextMenuPosition}
                        sections={[
                            {
                                title: 'Nodes',
                                items: [
                                    { icon: 'add', label: 'New Node' },
                                    { icon: 'stream', label: 'Hello 456' }
                                ]
                            },
                            {
                                items: [
                                    { icon: 'code', label: 'View Fragment' },
                                    { icon: 'fullscreen', label: 'View Fullscreen' }
                                ]
                            }
                        ]}
                    />
                )}
            </Circuit>
        );
    })
);
