import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DraggableEventHandler } from 'react-draggable';

import { Node } from '../../components/Node/Node';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { INodeContainerProps } from './NodeContainer.types';

export const NodeContainer = observer(({ node }: INodeContainerProps) => {
    const circuit = useCircuit();

    const onClick = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            circuit.setSelectedNode(node);
        },
        [circuit, node]
    );

    const onFocus = React.useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
            circuit.setSelectedNode(node);
        },
        [circuit, node]
    );

    const onClose = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (circuit.selectedNode === node) {
                circuit.setSelectedNode();
            }

            node.dispose();
        },
        [circuit, node]
    );

    const handleOnDrag: DraggableEventHandler = React.useCallback(
        (e, { x, y }) => {
            node.setPosition({ x, y });
        },
        [node]
    );

    const isSelected = React.useMemo(() => circuit.selectedNode === node, [circuit, node]);

    return (
        <Node
            name={node.name}
            active={isSelected}
            inputs={Object.values(node.inputs)}
            outputs={Object.values(node.outputs)}
            onClick={onClick}
            onFocus={onFocus}
            onDrag={handleOnDrag}
            position={node.data.position}
            // @ts-ignore
            icon={node.constructor.icon}
            actions={[
                {
                    color: 'var(--system-red)',
                    onClick: onClose
                }
            ]}
        />
    );
});
