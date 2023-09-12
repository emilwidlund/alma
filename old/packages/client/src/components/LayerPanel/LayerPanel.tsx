'use client';

import { useMutation, useQuery } from '@apollo/client';
import { RouteOutlined, NotesOutlined, AddOutlined, TonalityOutlined, MoreVertOutlined } from '@mui/icons-material';
import { BlendingModeSchema, Layer } from '@usealma/types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { capitalize, upperCase } from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { DragDropContext, Draggable, OnDragEndResponder, OnDragStartResponder } from 'react-beautiful-dnd';

import { LayerItemProps, LayerPanelProps } from './LayerPanel.types';
import { ButtonVariant } from '../Button/Button.types';
import { ContextMenuContainer } from '../Circuit/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { IconButton } from '../IconButton/IconButton';
import { Select } from '../Select/Select';
import { StrictModeDroppable } from '../StrictModeDroppable/StrictModeDroppable';
import { Switch } from '../Switch/Switch';
import { Well } from '../Well/Well';
import { BlendingMode } from '~/apollo/generated/graphql';
import { DELETE_LAYER_MUTATION, UPDATE_LAYER_MUTATION, UPDATE_PROJECT_MUTATION } from '~/apollo/mutations';
import { LAYER_QUERY, PROJECT_QUERY } from '~/apollo/queries';
import { useHover } from '~/hooks/useHover/useHover';
import { useNewLayerModal } from '~/hooks/useNewLayerModal/useNewLayerModal';
import { useProject } from '~/providers/ProjectProvider/ProjectProvider';

const LayerItem = ({ active, onClick, layerId, index }: LayerItemProps) => {
    const { projectId } = useProject();
    const { isHovered, onMouseEnter, onMouseLeave } = useHover();
    const { data: { layer } = { layer: undefined } } = useQuery(LAYER_QUERY, { variables: { id: layerId } });
    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION);

    const iconClassNames = clsx('flex items-center justify-center rounded-xl w-10 h-10', {
        'bg-neutral-600': !active,
        'text-accent': active,
        'shadow-sm': !active
    });

    const toggleEnabled = useCallback(() => {
        if (layer) {
            updateLayer({
                variables: {
                    id: layerId,
                    projectId: projectId,
                    enabled: !layer.enabled
                },
                optimisticResponse: {
                    updateLayer: {
                        ...layer,
                        __typename: layer.type === 'FRAGMENT' ? 'FragmentLayer' : 'CircuitLayer',
                        id: layerId,
                        enabled: !layer.enabled
                    }
                }
            });
        }
    }, [layer, layerId, projectId, updateLayer]);

    const handleInput: FormEventHandler<HTMLHeadingElement> = useCallback(e => {
        e.currentTarget.textContent?.replace(/(\r\n|\n|\r)/gm, '');
    }, []);

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLHeadingElement>) => {
            const name = e.currentTarget.textContent?.length ? e.currentTarget.textContent : 'Untitled';

            updateLayer({
                variables: {
                    id: layerId,
                    projectId: projectId,
                    name
                },
                optimisticResponse: {
                    updateLayer: {
                        ...layer,
                        __typename: layer?.type === 'FRAGMENT' ? 'FragmentLayer' : 'CircuitLayer',
                        id: layerId,
                        name
                    }
                }
            });
        },
        [layer, layerId, projectId, updateLayer]
    );

    if (!layer) {
        return null;
    }

    return (
        <Draggable draggableId={layer.id} index={index}>
            {(provided, snap) => {
                const wrapperClassNames = clsx(
                    'flex items-center justify-between p-3 rounded-2xl last:mb-0 transition-colors transitions-shadow duration-100 cursor-pointer',
                    {
                        'bg-neutral-600': active || snap.isDragging,
                        'hover:bg-neutral-600': !active,
                        'shadow-xl': active || snap.isDragging
                    }
                );

                const titleClassNames = clsx('font-medium text-xs line-clamp-1 cursor-text', {
                    'text-slate-300': active
                });

                return (
                    <div
                        ref={provided.innerRef}
                        className={wrapperClassNames}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, marginBottom: 8 }}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <div className="flex items-center">
                            <div className={iconClassNames}>
                                {layer.type === 'FRAGMENT' ? (
                                    <NotesOutlined fontSize="small" />
                                ) : (
                                    <RouteOutlined fontSize="small" />
                                )}
                            </div>
                            <div className="flex flex-col ml-4">
                                <h3
                                    className={titleClassNames}
                                    spellCheck={false}
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    onInput={handleInput}
                                    onBlur={handleBlur}
                                >
                                    {layer.name}
                                </h3>
                                <span className="text-xs opacity-50 mt-1 capitalize">{layer.type.toLowerCase()}</span>
                            </div>
                        </div>
                        {(active || isHovered) && (
                            <motion.div className="mr-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Switch active={layer.enabled} onChange={toggleEnabled} />
                            </motion.div>
                        )}
                    </div>
                );
            }}
        </Draggable>
    );
};

export const LayerPanel = ({ layers }: LayerPanelProps) => {
    const [contextMenuOpen, toggleContextMenu] = useState(false);
    const { projectId, activeLayerId } = useProject();
    const { open } = useNewLayerModal();
    const router = useRouter();

    const { data: { project } = { project: undefined } } = useQuery(PROJECT_QUERY, { variables: { id: projectId } });
    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);
    const [deleteLayer] = useMutation(DELETE_LAYER_MUTATION, {
        refetchQueries: [{ query: PROJECT_QUERY, variables: { id: projectId } }]
    });
    const { data: { layer: activeLayer } = { layer: undefined } } = useQuery(LAYER_QUERY, {
        variables: { id: activeLayerId || '' }
    });
    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION);

    const items = useMemo(() => layers.slice().reverse(), [layers]);

    const handleCreateLayer = useCallback(() => {
        open();
    }, [open]);

    const createSelectLayerHandler = useCallback(
        (layer: Layer) => {
            return () => {
                router.replace({
                    query: {
                        ...router.query,
                        activeLayerId: layer.id
                    }
                });
            };
        },
        [router]
    );

    const handleDragStart: OnDragStartResponder = useCallback(
        result => {
            router.replace({
                query: {
                    ...router.query,
                    activeLayerId: result.draggableId
                }
            });
        },
        [router]
    );

    const handleDragEnd: OnDragEndResponder = useCallback(
        result => {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            // reorder using index of source and destination.
            const itemsCopy = items.slice();
            const [removed] = itemsCopy.splice(result.source.index, 1);
            // put the removed one into destination.
            itemsCopy.splice(result.destination.index, 0, removed);

            const order = itemsCopy
                .slice()
                .reverse()
                .map(layer => layer.id);

            updateProject({
                variables: { id: projectId, layerOrder: order },
                optimisticResponse: {
                    updateProject: {
                        ...project,
                        __typename: 'Project',
                        id: projectId,
                        // @ts-ignore
                        layers:
                            project?.layers
                                ?.slice()
                                .sort((a, b) => order.indexOf(a?.id || '') - order.indexOf(b?.id || '')) ?? []
                    }
                }
            });
        },
        [items, project, projectId, updateProject]
    );

    const handleUpdateBlendingMode: ChangeEventHandler<HTMLSelectElement> = useCallback(
        e => {
            if (activeLayerId) {
                updateLayer({
                    variables: {
                        id: activeLayerId,
                        projectId: projectId,
                        blendingMode: upperCase(e.target.value) as BlendingMode
                    },
                    optimisticResponse: {
                        updateLayer: {
                            ...activeLayer,
                            __typename: activeLayer?.type === 'FRAGMENT' ? 'FragmentLayer' : 'CircuitLayer',
                            id: activeLayerId,
                            blendingMode: upperCase(e.target.value) as BlendingMode
                        }
                    }
                });
            }
        },
        [activeLayer, activeLayerId, projectId, updateLayer]
    );

    const handleToggleContextMenu = useCallback(() => {
        toggleContextMenu(true);
    }, [toggleContextMenu]);

    const handleRemoveLayer = useCallback(() => {
        if (activeLayerId) {
            deleteLayer({ variables: { id: activeLayerId } });

            const query = router.query;
            delete query.activeLayerId;

            router.replace({
                query
            });

            toggleContextMenu(false);
        }
    }, [activeLayerId, deleteLayer, router]);

    return (
        <div className="flex flex-col shrink-0 grow">
            <div className="flex flex-nowrap gap-x-4 items-center mb-4">
                <IconButton icon={<AddOutlined />} onClick={handleCreateLayer} compact />
                <Select
                    icon={TonalityOutlined}
                    value={capitalize(activeLayer?.blendingMode)}
                    onChange={handleUpdateBlendingMode}
                >
                    {Object.values(BlendingModeSchema.Values).map(blendingMode => (
                        <option key={blendingMode}>{capitalize(blendingMode)}</option>
                    ))}
                </Select>
                <div className="relative">
                    <IconButton
                        variant={ButtonVariant.SECONDARY}
                        icon={<MoreVertOutlined />}
                        onClick={handleToggleContextMenu}
                        compact
                    />
                    {contextMenuOpen && (
                        <ContextMenuContainer
                            sections={[
                                {
                                    items: [
                                        {
                                            icon: '',
                                            label: 'Remove Layer',
                                            onClick: handleRemoveLayer
                                        },
                                        {
                                            icon: '',
                                            label: 'Duplicate Layer'
                                        }
                                    ]
                                }
                            ]}
                            position={{ x: -167, y: -90 }}
                            onClose={() => toggleContextMenu(false)}
                        />
                    )}
                </div>
            </div>
            <Well className="grow">
                <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <StrictModeDroppable droppableId="layers">
                        {provided => (
                            <div ref={provided.innerRef} className="flex flex-col grow" {...provided.droppableProps}>
                                {items.map((layer, index) => (
                                    <LayerItem
                                        key={layer.id}
                                        index={index}
                                        onClick={createSelectLayerHandler(layer)}
                                        layerId={layer.id}
                                        active={activeLayer?.id === layer.id}
                                    />
                                ))}
                            </div>
                        )}
                    </StrictModeDroppable>
                </DragDropContext>
            </Well>
        </div>
    );
};
