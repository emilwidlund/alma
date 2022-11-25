import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Circuit } from '../../components/Circuit/Circuit';
import { Connection } from '../../components/Connection/Connection';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useGLSLModal } from '../../hooks/useGLSLModal/useGLSLModal';
import { useMousePosition } from '../../hooks/useMousePosition/useMousePosition';
import { NodeContainer } from '../NodeContainer/NodeContainer';
import { circuitContainerStyles } from './CircuitContainer.styles';

export const CircuitContainer = observer(
    React.forwardRef<HTMLDivElement>((props, ref) => {
        const svgRef = React.useRef<SVGSVGElement>(null);
        const circuit = useCircuit();
        const { onMouseMove, mousePosition } = useMousePosition();
        const { open } = useGLSLModal();

        const onMouseUp = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                circuit.setConnectionDraft();
            },
            [circuit]
        );

        const onClick = React.useCallback(
            (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                if (svgRef.current === e.target) {
                    circuit.setSelectedNodes([]);
                }
            },
            [circuit]
        );

        return (
            <Circuit ref={ref} className={circuitContainerStyles} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                {Array.from(circuit.context?.nodes.values() || []).map(node => (
                    <NodeContainer key={node.id} node={node} />
                ))}

                <svg ref={svgRef} id="connections" width="100%" height="100%" onClick={onClick}>
                    {Array.from(circuit.context?.connections.values() || []).map(connection => (
                        <Connection key={connection.id} connection={connection} />
                    ))}

                    {circuit.connectionDraft && <Connection output={circuit.connectionDraft} point={mousePosition} />}
                </svg>
            </Circuit>
        );
    })
);
