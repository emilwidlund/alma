import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DraggableEventHandler } from 'react-draggable';

import { Node } from '../../components/Node/Node';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useNodeActions } from '../../hooks/useNodeActions/useNodeActions';
import { INodeContainerProps } from './NodeContainer.types';

export const NodeContainer = observer(({ node }: INodeContainerProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const circuit = useCircuit();
    const actions = useNodeActions(node);

    React.useEffect(() => {
        if (ref.current) {
            circuit.setNodeElement(node.id, ref.current);

            return () => {
                circuit.removeNodeElement(node.id);
            };
        }
    }, []);

    const onClick = React.useCallback(
        e => {
            circuit.setSelectedNodes([node]);
        },
        [circuit, node]
    );

    const onFocus = React.useCallback(() => {
        circuit.setSelectedNodes([node]);
    }, [circuit, node]);

    const handleOnDrag: DraggableEventHandler = React.useCallback(
        (e, { x, y }) => {
            e.preventDefault();
            e.stopPropagation();

            node.setPosition({ x, y });
        },
        [node]
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
