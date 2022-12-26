import { useQuery } from '@apollo/client';
import { IContextSerialized, Node } from 'alma-graph';
import { ClassConstructor } from 'alma-webgl';
import { reaction } from 'mobx';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Query } from '../../../generated/graphql';
import GET_PROJECT_QUERY from '../../apollo/queries/getProject.gql';
import { ContextMenuContainer } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { Scene } from '../../components/Scene/Scene';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { CircuitContainer } from '../../containers/CircuitContainer/CircuitContainer';
import { ProjectHeaderContainer } from '../../containers/ProjectHeaderContainer/ProjectHeaderContainer';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { useCartesianMidpoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useCodeModal } from '../../hooks/useCodeModal/useCodeModal';
import { useCreateNode } from '../../hooks/useCreateNode/useCreateNode';
import { useFragmentModal } from '../../hooks/useFragmentModal/useFragmentModal';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { examplesHierarchy, nodesHierarchy } from '../../utils/nodes/nodes';
import { circuitRouteWrapperStyles, contextMenuWrapperStyles, examplesMenuWrapperStyles } from './CircuitRoute.styles';

export const CircuitRoute = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [nodesMenuVisible, toggleNodesMenu] = React.useState(false);
    const [examplesMenuVisible, toggleExamplesMenu] = React.useState(false);
    const [isInFullscreen, setIsInFullscreen] = React.useState(false);
    const [isDirty, setIsDirty] = React.useState(false);
    const { open: openFragmentModal } = useFragmentModal();
    const { open: openCodeModal } = useCodeModal();
    const midPoint = useCartesianMidpoint(circuitRef);

    const { projectId } = useParams();
    const { data: getProjectData } = useQuery<Query>(GET_PROJECT_QUERY, { variables: { id: projectId } });

    const serializedCircuit = React.useMemo(
        () =>
            getProjectData?.getProject.circuit
                ? JSON.parse(JSON.stringify(getProjectData?.getProject.circuit))
                : undefined,
        [getProjectData]
    );

    const { context, buildContext } = useCircuitContext(canvasRef);
    const createNode = useCreateNode(context, midPoint.current);

    React.useEffect(() => {
        if (serializedCircuit) {
            return buildContext(serializedCircuit);
        }
    }, [serializedCircuit]);

    React.useEffect(() => {
        if (context) {
            const valueReactionDisposer = reaction(
                () => JSON.parse(JSON.stringify(context)),
                (value, previous, reaction) => {
                    setIsDirty(true);

                    reaction.dispose();
                }
            );

            return () => {
                valueReactionDisposer?.();
            };
        }
    }, [context, setIsDirty]);

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
        const canvasFullscreenHandler = (e: HTMLElementEventMap['fullscreenchange']) => {
            setIsInFullscreen(!!document.fullscreenElement);
        };

        const documentFullscreenHandler = (e: DocumentEventMap['fullscreenchange']) => {
            context?.reset();
        };

        canvasRef.current?.addEventListener('fullscreenchange', canvasFullscreenHandler);
        document.addEventListener('fullscreenchange', documentFullscreenHandler);

        return () => {
            canvasRef.current?.removeEventListener('fullscreenchange', canvasFullscreenHandler);
            document.removeEventListener('fullscreenchange', documentFullscreenHandler);
        };
    }, [context]);

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

    if (!getProjectData?.getProject) return null;

    return (
        <CircuitProvider context={context}>
            <Scene>
                <ProjectHeaderContainer
                    project={getProjectData.getProject}
                    circuit={context}
                    isDirty={isDirty}
                    setIsDirty={setIsDirty}
                />
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
