import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DraggableEventHandler } from 'react-draggable';

import { Node } from '../../components/Node/Node';
import { useSchematic } from '../../hooks/useSchematic/useSchematic';
import { INodeContainerProps } from './NodeContainer.types';

export const NodeContainer = observer(({ node }: INodeContainerProps) => {
    const schematic = useSchematic();

    const onClick = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            schematic.setSelectedNode(node);
        },
        [schematic, node]
    );

    const onFocus = React.useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
            schematic.setSelectedNode(node);
        },
        [schematic, node]
    );

    const onClose = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (schematic.selectedNode === node) {
                schematic.setSelectedNode();
            }

            schematic.context?.remove(node);
        },
        [schematic, node]
    );

    const handleOnDrag: DraggableEventHandler = React.useCallback(
        (e, { x, y }) => {
            node.setPosition({ x, y });
        },
        [node]
    );

    const isSelected = React.useMemo(() => schematic.selectedNode === node, [schematic, node]);

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
            actions={[
                {
                    color: 'var(--system-red)',
                    onClick: onClose
                }
            ]}
        />
    );
});
