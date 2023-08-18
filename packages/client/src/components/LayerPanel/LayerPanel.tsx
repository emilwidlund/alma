'use client';

import {
    RouteOutlined,
    NotesOutlined,
    AddOutlined,
    OpacityOutlined,
    TonalityOutlined,
    MoreVertOutlined
} from '@mui/icons-material';
import { clsx } from 'clsx';
import { FormEventHandler, useCallback, useMemo } from 'react';
import { DragDropContext, Draggable, OnDragEndResponder, OnDragStartResponder } from 'react-beautiful-dnd';

import { LayerItemProps } from './LayerPanel.types';
import { ButtonVariant } from '../Button/Button.types';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { StrictModeDroppable } from '../StrictModeDroppable/StrictModeDroppable';
import { Switch } from '../Switch/Switch';
import { Well } from '../Well/Well';

import { Layer } from '@/../types/build';
import { useNewLayerModal } from '~/hooks/useNewLayerModal/useNewLayerModal';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

const LayerItem = ({ active, onClick, layer, index }: LayerItemProps) => {
    const { toggleLayer, renameLayer } = useProjectContext();

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
                        {active && (
                            <div className="mr-2 cursor-pointer">
                                <Switch active={enabled} onChange={toggleEnabled} />
                            </div>
                        )}
                    </div>
                );
            }}
        </Draggable>
    );
};

export const LayerPanel = () => {
    const { project, activeLayer, setActiveLayerId, reorderLayers } = useProjectContext();
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

    return (
        <div className="flex flex-col shrink-0 grow">
            <div className="flex items-center mb-4">
                <IconButton icon={<AddOutlined />} onPress={handleCreateLayer} />
                <Input
                    className="ml-2 border border-black border-opacity-5"
                    icon={<TonalityOutlined />}
                    defaultValue="Normal"
                />
                <Input
                    className="ml-2 w-28 border border-black border-opacity-5"
                    icon={<OpacityOutlined />}
                    defaultValue="100%"
                />
                <IconButton className="ml-2" variant={ButtonVariant.SECONDARY} icon={<MoreVertOutlined />} />
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
