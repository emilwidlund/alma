'use client';

import {
    RouteOutlined,
    NotesOutlined,
    AddOutlined,
    TonalityOutlined,
    MoreVertOutlined
} from '@mui/icons-material';
import { BlendingMode, BlendingModeSchema, Layer } from '@usealma/types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { capitalize, upperCase } from 'lodash';
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { DragDropContext, Draggable, OnDragEndResponder, OnDragStartResponder } from 'react-beautiful-dnd';

import { LayerItemProps } from './LayerPanel.types';
import { ButtonVariant } from '../Button/Button.types';
import { ContextMenuContainer } from '../Circuit/ContextMenu/ContextMenuContainer/ContextMenuContainer';
import { IconButton } from '../IconButton/IconButton';
import { Select } from '../Select/Select';
import { StrictModeDroppable } from '../StrictModeDroppable/StrictModeDroppable';
import { Switch } from '../Switch/Switch';
import { Well } from '../Well/Well';

import { useHover } from '~/hooks/useHover/useHover';
import { useNewLayerModal } from '~/hooks/useNewLayerModal/useNewLayerModal';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

const LayerItem = ({ active, onClick, layer, index }: LayerItemProps) => {
    const { toggleLayer, renameLayer } = useProjectContext();
    const { isHovered, onMouseEnter, onMouseLeave } = useHover();

    const { type, name, enabled } = layer;

    const iconClassNames = clsx('flex items-center justify-center rounded-xl w-10 h-10', {
        'bg-neutral-100': !active,
        'shadow-sm': !active
    });

    const toggleEnabled = useCallback(() => {
        toggleLayer(layer.id, !layer.enabled);
    }, [layer, toggleLayer]);

    const handleInput: FormEventHandler<HTMLHeadingElement> = useCallback(
        e => {
            e.currentTarget.textContent?.replace(/(\r\n|\n|\r)/gm, '');
        },
        []
    );

    const handleBlur = useCallback((e: React.FocusEvent<HTMLHeadingElement>) => {
        const name = e.currentTarget.textContent;

        if (!name?.length) {
            e.currentTarget.textContent = 'Untitled';
        }

        renameLayer(layer.id, name?.length ? name : 'Untitled');
    }, [layer.id, renameLayer]);

    return (
        <Draggable draggableId={layer.id} index={index}>
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
                                {type === 'FRAGMENT' ? (
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
                                    {name}
                                </h3>
                                <span className="text-xs opacity-50 mt-1 capitalize">{type.toLowerCase()}</span>
                            </div>
                        </div>
                        {(active || isHovered) && (
                            <motion.div className="mr-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Switch active={enabled} onChange={toggleEnabled} />
                            </motion.div>
                        )}
                    </div>
                );
            }}
        </Draggable>
    );
};

export const LayerPanel = () => {
    const [contextMenuOpen, toggleContextMenu] = useState(false);
    const { project, activeLayer, activeLayerId, updateLayerBlendingMode, removeLayer, setActiveLayerId, reorderLayers } = useProjectContext();
    const items = useMemo(() => project?.layers.slice().reverse() ?? [], [project]);
    const { open } = useNewLayerModal();

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

    const handleUpdateBlendingMode: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        if (activeLayer) {
            updateLayerBlendingMode(activeLayer.id, upperCase(e.target.value) as BlendingMode);
        }
    }, [activeLayer, updateLayerBlendingMode]);

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
                    {Object.values(BlendingModeSchema.Values).map(blendingMode => <option key={blendingMode}>{capitalize(blendingMode)}</option>)}
                </Select>
                <div className='relative'>
                    <IconButton variant={ButtonVariant.SECONDARY} icon={<MoreVertOutlined />} onClick={handleToggleContextMenu} />
                    {contextMenuOpen && <ContextMenuContainer sections={[{ items: [{ icon: '', label: 'Remove Layer', onClick: handleRemoveLayer }] }]} position={{ x: -160, y: 40 }} onClose={() => toggleContextMenu(false)} />}
                </div>
            </div>
            <Well className="grow">
                <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <StrictModeDroppable droppableId="layers">
                        {(provided) => (
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
