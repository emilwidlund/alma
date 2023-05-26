import { IContextSerialized, Node } from 'alma-graph';
import { ClassConstructor } from 'alma-webgl';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import {
    circuitRouteHeaderStyles,
    circuitRouteWrapperStyles,
    contextMenuWrapperStyles,
    examplesMenuWrapperStyles
} from './CircuitRoute.styles';
import { ContextMenuContainer } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { Scene } from '../../components/Scene/Scene';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { CircuitContainer } from '../../containers/CircuitContainer/CircuitContainer';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import * as creationExample from '../../examples/creation.json';
import { useCartesianMidpoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useCodeModal } from '../../hooks/useCodeModal/useCodeModal';
import { useCreateNode } from '../../hooks/useCreateNode/useCreateNode';
import { useFragmentModal } from '../../hooks/useFragmentModal/useFragmentModal';
import { useWelcomeModal } from '../../hooks/useWelcomeModal/useWelcomeModal';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { examplesHierarchy, nodesHierarchy } from '../../utils/nodes/nodes';

export const CircuitRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [nodesMenuVisible, toggleNodesMenu] = React.useState(false);
    const [examplesMenuVisible, toggleExamplesMenu] = React.useState(false);
    const [isInFullscreen, setIsInFullscreen] = React.useState(false);
    const { open: openFragmentModal } = useFragmentModal();
    const { open: openCodeModal } = useCodeModal();
    const midPoint = useCartesianMidpoint(circuitRef);

    const { open: openWelcomeModal } = useWelcomeModal();
    const [params] = useSearchParams();

    React.useEffect(() => {
        if (!localStorage.getItem('onboardingCompleted') || params.get('onboarding') === 'true') {
            openWelcomeModal({
                onClose: () => {
                    localStorage.setItem('onboardingCompleted', 'true');
                }
            });
        }
    }, []);

    const serializedCtx = localStorage.getItem('context')
        ? JSON.parse(localStorage.getItem('context') || '{}')
        : creationExample;

    const { context, buildContext } = useCircuitContext(canvasRef, serializedCtx);
    const createNode = useCreateNode(context, midPoint.current);

    const onContextMenuItemClick = React.useCallback(
        (nodeClass: ClassConstructor<Node>) => {
            toggleNodesMenu(false);

            createNode(nodeClass);
        },
        [createNode, toggleNodesMenu]
    );

    const onExamplesMenuItemClick = React.useCallback(
        (serialized: IContextSerialized) => {
            buildContext(serialized);

            toggleExamplesMenu(false);
        },
        [createNode, toggleNodesMenu]
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
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();

            toggleNodesMenu(position => !position);
        },
        [toggleNodesMenu]
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
            const docEl = canvasRef.current;

            const requestFullScreen =
                docEl.requestFullscreen ||
                docEl.mozRequestFullScreen ||
                docEl.webkitRequestFullscreen ||
                docEl.msRequestFullscreen;
            const cancelFullScreen =
                document.exitFullscreen ||
                document.mozCancelFullScreen ||
                document.webkitExitFullscreen ||
                document.msExitFullscreen;

            if (
                !document.fullscreenElement &&
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement &&
                !document.msFullscreenElement
            ) {
                requestFullScreen.call(docEl);
            } else {
                cancelFullScreen.call(document);
            }
        }
    }, []);

    const canvasSize = isInFullscreen ? window.screen : { width: 320, height: 220 };

    return (
        <CircuitProvider context={context}>
            <Scene>
                <header className={circuitRouteHeaderStyles}>
                    <img src="/assets/images/logo.png" width={30} />
                    <span>Alma</span>
                </header>
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
                        <ToolbarItem
                            label="Examples"
                            icon="shape_line"
                            onClick={toggleExamplesMenu.bind(this, true)}
                            outlined
                        />
                        <ToolbarItem label="New Node" icon="add" onClick={toggleNodesMenu.bind(this, true)} cta />
                        <ToolbarItem label="Import / Export" icon="save" onClick={onImportExportClick} />
                        <ToolbarItem label="Fullscreen" icon="open_in_full" onClick={onFullscreenClick} />
                    </Toolbar>
                    {!!nodesMenuVisible && (
                        <div className={contextMenuWrapperStyles}>
                            <ContextMenuContainer
                                sections={nodesHierarchy(onContextMenuItemClick)}
                                onClose={toggleNodesMenu.bind(this, false)}
                            />
                        </div>
                    )}
                    {!!examplesMenuVisible && (
                        <div className={examplesMenuWrapperStyles}>
                            <ContextMenuContainer
                                sections={examplesHierarchy(onExamplesMenuItemClick)}
                                onClose={toggleExamplesMenu.bind(this, false)}
                            />
                        </div>
                    )}
                </div>
            </Scene>
        </CircuitProvider>
    );
};
