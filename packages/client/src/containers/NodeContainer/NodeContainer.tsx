import { WebGLNodeType } from '@usealma/webgl';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DraggableEventHandler } from 'react-draggable';

import { NodeContainerProps } from './NodeContainer.types';
import { useCircuit } from '../../hooks/useCircuit/useCircuit';
import { useNodeActions } from '../../hooks/useNodeActions/useNodeActions';

import { Node } from '~/components/Circuit/Node/Node';
import { NODE_ICON_RESOLVER_MAP } from '~/utils/icons/iconResolver';

export const NodeContainer = observer(({ node }: NodeContainerProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const circuit = useCircuit();
    const actions = useNodeActions(node);
    const Icon = NODE_ICON_RESOLVER_MAP[node.type as WebGLNodeType];

    React.useEffect(() => {
        if (ref.current) {
            circuit.setNodeElement(node.id, ref.current);
        }

        return () => {
            circuit.removeNodeElement(node.id);
        };
// eslint-disabled-next-line react-hooks/exhaustive-deps
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
            icon={Icon}
            inputs={Object.values(node.inputs)}
            outputs={Object.values(node.outputs)}
            onClick={onClick}
            onFocus={onFocus}
            onDrag={handleOnDrag}
            position={node.data.position}
            actions={actions}
        />
    );
});
