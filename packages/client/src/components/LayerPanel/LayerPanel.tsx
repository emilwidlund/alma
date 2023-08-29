'use client';

import { useMutation, useQuery } from '@apollo/client';
import { RouteOutlined, NotesOutlined, AddOutlined, TonalityOutlined, MoreVertOutlined } from '@mui/icons-material';
import { BlendingMode, BlendingModeSchema, Layer } from '@usealma/types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { capitalize, upperCase } from 'lodash';
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

import UPDATE_LAYER_MUTATION from '~/apollo/mutations/updateLayer.gql';
import LAYER_QUERY from '~/apollo/queries/layer.gql';
import PROJECT_QUERY from '~/apollo/queries/project.gql';
import { useHover } from '~/hooks/useHover/useHover';
import { useNewLayerModal } from '~/hooks/useNewLayerModal/useNewLayerModal';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

const LayerItem = ({ active, onClick, layer, index }: LayerItemProps) => {
    const { project } = useProjectContext();
    const { isHovered, onMouseEnter, onMouseLeave } = useHover();

    const { data = { layer: undefined } } = useQuery(LAYER_QUERY, { variables: { id: layer.id } });
    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION, {
        refetchQueries: [
            { query: LAYER_QUERY, variables: { id: layer.id } },
            { query: PROJECT_QUERY, variables: { id: project?.id } }
        ]
    });

    const iconClassNames = clsx('flex items-center justify-center rounded-xl w-10 h-10', {
        'bg-neutral-100': !active,
        'shadow-sm': !active
    });

    const toggleEnabled = useCallback(() => {
        updateLayer({
            variables: {
                id: data.layer.id,
                projectId: project?.id,
                enabled: !data.layer.enabled
            }
        });
    }, [data, project, updateLayer]);

    const handleInput: FormEventHandler<HTMLHeadingElement> = useCallback(e => {
        e.currentTarget.textContent?.replace(/(\r\n|\n|\r)/gm, '');
    }, []);

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLHeadingElement>) => {
            const name = e.currentTarget.textContent;

            if (!name?.length) {
                e.currentTarget.textContent = 'Untitled';
            }

            updateLayer({
                variables: {
                    id: data.layer.id,
                    projectId: project?.id,
                    name: name?.length ? name : 'Untitled'
                }
            });
        },
        [data, project, updateLayer]
    );

    if (!data.layer) {
        return;
    }

    return (
        <Draggable draggableId={data.layer.id} index={index}>
            {(provided, snap) => {
                const classNames = clsx(
                    'flex items-center justify-between p-3 rounded-2xl last:mb-0 transition-colors transitions-shadow duration-100 cursor-pointer',
                    {
                        'bg-neutral-100': active || snap.isDragging,
                        'hover:bg-neutral-100': !active,
                        'shadow-lg': active || snap.isDragging
                    }
                );

                return (
                    <div
                        ref={provided.innerRef}
                        className={classNames}
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
                                    className="font-medium text-xs line-clamp-1 cursor-text"
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
    const {
        project,
        activeLayer,
        activeLayerId,
        updateLayerBlendingMode,
        removeLayer,
        setActiveLayerId,
        reorderLayers
    } = useProjectContext();
    const items = useMemo(() => layers.slice().reverse() ?? [], [layers]);
    const { open } = useNewLayerModal();

    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION, {
        refetchQueries: [{ query: PROJECT_QUERY, variables: { id: project?.id } }]
    });

    const handleCreateLayer = useCallback(() => {
        open();
    }, [open]);

    const createSelectLayerHandler = useCallback(
        (layer: Layer) => {
            return () => {
                setActiveLayerId(layer.id);
            };
        },
        [setActiveLayerId]
    );

    const handleDragStart: OnDragStartResponder = useCallback(
        result => {
            setActiveLayerId(result.draggableId);
        },
        [setActiveLayerId]
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

            reorderLayers(itemsCopy.slice().reverse());
        },
        [items, reorderLayers]
    );

    const handleUpdateBlendingMode: ChangeEventHandler<HTMLSelectElement> = useCallback(
        e => {
            if (activeLayer) {
                updateLayer({
                    variables: {
                        id: activeLayer.id,
                        projectId: project?.id,
                        blendingMode: upperCase(e.target.value) as BlendingMode
                    }
                });
            }
        },
        [activeLayer, project, updateLayer]
    );

    const handleToggleContextMenu = useCallback(() => {
        toggleContextMenu(state => !state);
    }, [toggleContextMenu]);

    const handleRemoveLayer = useCallback(() => {
        if (activeLayerId) {
            removeLayer(activeLayerId);
            toggleContextMenu(false);
        }
    }, [removeLayer, activeLayerId]);

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
                            sections={[{ items: [{ icon: '', label: 'Remove Layer', onClick: handleRemoveLayer }] }]}
                            position={{ x: -160, y: 40 }}
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
                                        layer={layer}
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
