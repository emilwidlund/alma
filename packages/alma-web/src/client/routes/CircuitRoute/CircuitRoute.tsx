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
import { useFragmentModal } from '../../hooks/useFragmentModal/useFragmentModal';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { nodesHierarchy } from '../../utils/nodes/nodes';
import { circuitRouteWrapperStyles, contextMenuWrapperStyles } from './CircuitRoute.styles';

export const CircuitRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [contextMenuVisible, toggleContextMenu] = React.useState(false);
    const [isInFullscreen, setIsInFullscreen] = React.useState(false);
    const { open: openFragmentModal } = useFragmentModal();
    const { open: openCodeModal } = useCodeModal();
    const midPoint = useCartesianMidpoint(circuitRef);

    const { context, buildContext } = useCircuitContext(canvasRef, JSON.parse(localStorage.getItem('context') || '{}'));
    const createNode = useCreateNode(context, midPoint.current);

    const onContextMenuItemClick = React.useCallback(
        (nodeClass: ClassConstructor<Node>) => {
            toggleContextMenu(false);

            createNode(nodeClass);
        },
        [createNode, toggleContextMenu]
    );

    const onImportExportClick = React.useCallback(() => {
        openCodeModal({
            content: JSON.stringify(context, undefined, 4),
            onSave: code => {
                buildContext(JSON.parse(code));
            }
        });
    }, [openCodeModal, context]);

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

    const canvasSize = isInFullscreen ? window.screen : { width: 320, height: 220 };

    return (
        <CircuitProvider context={context}>
            <Scene>
                <div className={circuitRouteWrapperStyles}>
                    <CircuitContainer ref={circuitRef} onContextMenu={onContextMenu} onFullscreen={onFullscreenClick} />
                    <PropertyPanel ref={canvasRef} artboardSize={canvasSize} />
                    <Toolbar>
                        <ToolbarItem
                            label="View Code"
                            icon="data_object"
                            onClick={() => openFragmentModal(context?.fragment || '')}
                            outlined
                        />
                        <ToolbarItem label="Connection" icon="conversion_path" onClick={console.log} />
                        <ToolbarItem label="New Node" icon="add" onClick={toggleContextMenu.bind(this, true)} cta />
                        <ToolbarItem label="Import / Export" icon="save" onClick={onImportExportClick} />
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
