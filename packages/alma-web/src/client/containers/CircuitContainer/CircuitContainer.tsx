import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Circuit } from '../../components/Circuit/Circuit';
import { Connection } from '../../components/Connection/Connection';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { NodeContainer } from '../NodeContainer/NodeContainer';
import { circuitContainerStyles, circuitSelectionStyles } from './CircuitContainer.styles';
import { IConnectionsProps } from './CircuitContainer.types';

const Nodes = () => {
    const circuit = useCircuit();

    return (
        <>
            {Array.from(circuit.context?.nodes.values() || []).map(node => (
                <NodeContainer key={node.id} node={node} />
            ))}
        </>
    );
};

const Connections = ({ mousePosition }: IConnectionsProps) => {
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
};

const Selection = () => {
    const circuit = useCircuit();

    return circuit.selectionBounds ? <div className={circuitSelectionStyles(circuit.selectionBounds)} /> : null;
};

export const CircuitContainer = observer(
    React.forwardRef<HTMLDivElement>((props, ref) => {
        const circuit = useCircuit();
        const { onMouseMove: mouseMoveHandler, mousePosition } = useMousePosition();

        const onMouseMove = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                mouseMoveHandler(e);

                if (circuit.selectionBounds) {
                    const { x, y, width, height } = circuit.selectionBounds;

                    circuit.setSelectionBounds({ x, y, width: width + e.movementX, height: height + e.movementY });
                }
            },
            [circuit, mouseMoveHandler]
        );

        const onMouseDown = React.useCallback(
            ({ clientX, clientY, nativeEvent }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                console.log(nativeEvent.target);
                if ((nativeEvent.target as HTMLDivElement).id === 'connections') {
                    circuit.setSelectionBounds({ x: clientX, y: clientY, width: 0, height: 0 });
                }
            },
            [circuit]
        );

        const onMouseUp = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                circuit.setConnectionDraft();
                circuit.setSelectionBounds();
            },
            [circuit]
        );

        return (
            <Circuit
                ref={ref}
                className={circuitContainerStyles}
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
