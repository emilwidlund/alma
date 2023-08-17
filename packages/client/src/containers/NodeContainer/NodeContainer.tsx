import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DraggableEventHandler } from 'react-draggable';

import { INodeContainerProps } from './NodeContainer.types';
import { Node } from '../../components/Node/Node';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useNodeActions } from '../../hooks/useNodeActions/useNodeActions';

export const NodeContainer = observer(({ node }: INodeContainerProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const circuit = useCircuit();
    const actions = useNodeActions(node);

    React.useEffect(() => {
        if (ref.current) {
            circuit.setNodeElement(node.id, ref.current);
        }

        return () => {
            circuit.removeNodeElement(node.id);
        };
    }, []);

    const onClick = React.useCallback(
        () => {
            if (!circuit.selectedNodes?.includes(node)) {
                circuit.setSelectedNodes([node]);
            }
        },
        [circuit, node]
    );

    const onFocus = React.useCallback(() => {
        if (!circuit.selectedNodes?.includes(node)) {
            circuit.setSelectedNodes([node]);
        }
    }, [circuit, node]);

    const handleOnDrag: DraggableEventHandler = React.useCallback(
        (e, { deltaX, deltaY }) => {
            e.preventDefault();
            e.stopPropagation();

            for (const selectedNode of circuit.selectedNodes || []) {
                selectedNode.setPosition({
                    x: selectedNode.data.position.x + deltaX,
                    y: selectedNode.data.position.y + -deltaY
                });
            }
        },
        [circuit]
    );

    const isSelected = React.useMemo(() => circuit.selectedNodes?.indexOf(node) !== -1, [circuit, node]);

    return (
        <Node
            ref={ref}
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
            actions={actions}
        />
    );
});
