'use client';

import {
    RouteOutlined,
    NotesOutlined,
    AddOutlined,
    LockOutlined,
    OpacityOutlined,
    TonalityOutlined
} from '@mui/icons-material';
import { clsx } from 'clsx';
import { useCallback } from 'react';

import { LayerItemProps, LayerPanelProps } from './LayerPanel.types';
import { ButtonVariant } from '../Button/Button.types';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { Switch } from '../Switch/Switch';
import { Well } from '../Well/Well';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

const LayerItem = ({ name, type, active, visible, onClick }: LayerItemProps) => {
    const classNames = clsx(
        'flex items-center justify-between p-3 rounded-2xl mb-2 last:mb-0 transition-colors transitions-shadow duration-100 cursor-pointer',
        {
            'bg-neutral-100': active,
            'hover:bg-neutral-100': !active,
            'shadow-lg': active
        }
    );

    const iconClassNames = clsx('flex items-center justify-center rounded-xl w-10 h-10', {
        'bg-neutral-100': !active,
        'shadow-sm': !active
    });

    return (
        <div className={classNames} onClick={onClick}>
            <div className="flex items-center">
                <div className={iconClassNames}>
                    {type === 'FRAGMENT' ? <NotesOutlined fontSize="small" /> : <RouteOutlined fontSize="small" />}
                </div>
                <div className="flex flex-col ml-4">
                    <h3 className="font-medium text-xs">{name}</h3>
                    <span className="text-xs opacity-50 mt-1 capitalize">{type.toLowerCase()}</span>
                </div>
            </div>
            {active && (
                <div className="mr-2">
                    <Switch active={visible} />
                </div>
            )}
        </div>
    );
};

export const LayerPanel = ({ items, activeLayerIndex, setActiveLayerIndex }: LayerPanelProps) => {
    const { createLayer } = useProjectContext();

    const handleCreateLayer = useCallback(() => {
        createLayer({
            id: Math.random().toString(),
            name: 'Untitled',
            type: 'FRAGMENT',
            enabled: true,
            blendingMode: 'NORMAL',
            context: ''
        });

        setActiveLayerIndex(-1);
    }, [setActiveLayerIndex]);

    const createSelectLayerHandler = useCallback(
        (index: number) => {
            return () => {
                setActiveLayerIndex(index);
            };
        },
        [setActiveLayerIndex]
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
                <IconButton className="ml-2" variant={ButtonVariant.SECONDARY} icon={<LockOutlined />} />
            </div>
            <Well className="grow">
                {items.map((props, index) => (
                    <LayerItem
                        {...props}
                        key={props.name}
                        onClick={createSelectLayerHandler(index)}
                        active={index === activeLayerIndex}
                    />
                ))}
            </Well>
        </div>
    );
};
