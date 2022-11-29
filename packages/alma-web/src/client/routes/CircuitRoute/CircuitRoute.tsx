import { Node } from 'alma-graph';
import { ClassConstructor } from 'alma-webgl';
import * as React from 'react';

import { ContextMenuContainer } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { Scene } from '../../components/Scene/Scene';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { CircuitContainer } from '../../containers/CircuitContainer/CircuitContainer';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { IPoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint.types';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useCodeModal } from '../../hooks/useCodeModal/useCodeModal';
import { useCreateNode } from '../../hooks/useCreateNode/useCreateNode';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { nodesHierarchy } from '../../utils/nodes/nodes';
import { circuitRouteWrapperStyles } from './CircuitRoute.styles';

export const CircuitRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [contextMenuPosition, toggleContextMenu] = React.useState<IPoint | undefined>(undefined);
    const { open: openCodeModal } = useCodeModal();

    const context = useCircuitContext(ref);
    const createNode = useCreateNode(context, contextMenuPosition);

    const onContextMenuItemClick = React.useCallback(
        (nodeClass: ClassConstructor<Node>) => {
            toggleContextMenu(undefined);

            createNode(nodeClass);
        },
        [createNode, toggleContextMenu]
    );

    const onContextMenu = React.useCallback(
        e => {
            e.preventDefault();

            toggleContextMenu(position => {
                if (position) {
                    return undefined;
                } else {
                    return { x: e.clientX, y: e.clientY };
                }
            });
        },
        [toggleContextMenu]
    );

    return (
        <CircuitProvider context={context}>
            <Scene>
                <div className={circuitRouteWrapperStyles}>
                    <CircuitContainer ref={circuitRef} onContextMenu={onContextMenu} />
                    <PropertyPanel ref={ref} />

                    <Toolbar>
                        <ToolbarItem label="Stream" icon="stream" onClick={console.log} />
                        <ToolbarItem
                            label="View Code"
                            icon="data_object"
                            onClick={() => openCodeModal(context?.fragment || '')}
                            outlined
                        />
                        <ToolbarItem label="New Node" icon="add" onClick={console.log} cta />
                        <ToolbarItem label="Connection" icon="conversion_path" onClick={console.log} />
                        <ToolbarItem label="Fullscreen" icon="open_in_full" onClick={console.log} />
                    </Toolbar>

                    {!!contextMenuPosition && (
                        <ContextMenuContainer
                            position={contextMenuPosition}
                            sections={[
                                {
                                    title: 'Nodes',
                                    items: [
                                        {
                                            icon: 'add',
                                            label: 'New Node',
                                            items: nodesHierarchy(onContextMenuItemClick)
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            icon: 'code',
                                            label: 'View Fragment',
                                            onClick: () => openCodeModal(context?.fragment || '')
                                        },
                                        { icon: 'fullscreen', label: 'View Fullscreen' }
                                    ]
                                }
                            ]}
                            onClose={() => toggleContextMenu(undefined)}
                        />
                    )}
                </div>
            </Scene>
        </CircuitProvider>
    );
};
