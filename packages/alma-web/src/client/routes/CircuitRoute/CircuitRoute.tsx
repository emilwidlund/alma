import { Node } from 'alma-graph';
import { ClassConstructor } from 'alma-webgl';
import * as React from 'react';

import { ContextMenuContainer } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { Scene } from '../../components/Scene/Scene';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { CircuitContainer } from '../../containers/CircuitContainer/CircuitContainer';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { useCartesianMidpoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useCodeModal } from '../../hooks/useCodeModal/useCodeModal';
import { useCreateNode } from '../../hooks/useCreateNode/useCreateNode';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { nodesHierarchy } from '../../utils/nodes/nodes';
import { circuitRouteWrapperStyles, contextMenuWrapperStyles } from './CircuitRoute.styles';

export const CircuitRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [contextMenuVisible, toggleContextMenu] = React.useState(false);
    const [isInFullscreen, setIsInFullscreen] = React.useState(false);
    const { open: openCodeModal } = useCodeModal();
    const midPoint = useCartesianMidpoint(circuitRef);

    const context = useCircuitContext(canvasRef);
    const createNode = useCreateNode(context, midPoint.current);

    const onContextMenuItemClick = React.useCallback(
        (nodeClass: ClassConstructor<Node>) => {
            toggleContextMenu(false);

            createNode(nodeClass);
        },
        [createNode, toggleContextMenu]
    );

    const onContextMenu = React.useCallback(
        e => {
            e.preventDefault();

            toggleContextMenu(position => !position);
        },
        [toggleContextMenu]
    );

    React.useEffect(() => {
        const handler = (e: HTMLElementEventMap['fullscreenchange']) => {
            setIsInFullscreen(!!document.fullscreenElement);
        };

        canvasRef.current?.addEventListener('fullscreenchange', handler);

        return () => {
            canvasRef.current?.removeEventListener('fullscreenchange', handler);
        };
    }, []);

    const onFullscreenClick = React.useCallback(() => {
        if (canvasRef.current) {
            canvasRef.current.requestFullscreen();
        }
    }, []);

    const canvasSize = isInFullscreen ? window.screen : { width: 300, height: 200 };

    return (
        <CircuitProvider context={context}>
            <Scene>
                <div className={circuitRouteWrapperStyles}>
                    <CircuitContainer ref={circuitRef} onContextMenu={onContextMenu} />
                    <PropertyPanel ref={canvasRef} artboardSize={canvasSize} />
                    <Toolbar>
                        <ToolbarItem label="Stream" icon="stream" onClick={console.log} />
                        <ToolbarItem
                            label="View Code"
                            icon="data_object"
                            onClick={() => openCodeModal(context?.fragment || '')}
                            outlined
                        />
                        <ToolbarItem label="New Node" icon="add" onClick={toggleContextMenu.bind(this, true)} cta />
                        <ToolbarItem label="Connection" icon="conversion_path" onClick={console.log} />
                        <ToolbarItem label="Fullscreen" icon="open_in_full" onClick={onFullscreenClick} />
                    </Toolbar>
                    {!!contextMenuVisible && (
                        <div className={contextMenuWrapperStyles}>
                            <ContextMenuContainer
                                sections={nodesHierarchy(onContextMenuItemClick)}
                                onClose={toggleContextMenu.bind(this, false)}
                            />
                        </div>
                    )}
                </div>
            </Scene>
        </CircuitProvider>
    );
};
