import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { circuitContainerStyles, circuitSelectionStyles } from './CircuitContainer.styles';
import { ICircuitContainerProps, IConnectionsProps } from './CircuitContainer.types';
import { Circuit } from '../../components/Circuit/Circuit';
import { Connection } from '../../components/Connection/Connection';
import { CIRCUIT_SIZE } from '../../constants/circuit';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useKeyboardActions } from '../../hooks/useKeyboardActions/useKeyboardActions';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { normalizeBounds } from '../../utils/bounds/bounds';
import { NodeContainer } from '../NodeContainer/NodeContainer';

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
    // eslint-disable-next-line react/display-name
    React.forwardRef<HTMLDivElement, ICircuitContainerProps>((_, ref) => {
        const circuit = useCircuit();
        const { onMouseMove: mouseMoveHandler, mousePosition } = useMousePosition();
        useKeyboardActions();

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

        const onMouseUp = React.useCallback(() => {
            circuit.setConnectionDraft();
            circuit.setSelectionBounds();
        }, [circuit]);

        return (
            <Circuit
                ref={ref}
                className={circuitContainerStyles}
                size={{ width: CIRCUIT_SIZE, height: CIRCUIT_SIZE }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                <Nodes />
                <Connections mousePosition={mousePosition} />
                <Selection />
            </Circuit>
        );
    })
);
