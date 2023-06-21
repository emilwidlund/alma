'use client';

import { cloneElement } from 'react';

import { UniformItemProps, UniformsPanelProps } from './UniformsPanel.types';
import { Well } from '../Well/Well';

const UniformItem = ({ name, type, icon }: UniformItemProps) => {
    return (
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
                <div className="flex items-center justify-center rounded-xl w-10 h-10 bg-neutral-100 shadow-sm">
                    {cloneElement(icon, { fontSize: 'small' })}
                </div>
                <div className="flex flex-col ml-4">
                    <h3 className="font-medium text-xs">{name}</h3>
                    <span className="text-xs opacity-50 mt-1">{type}</span>
                </div>
            </div>
        </div>
    );
};

export const UniformsPanel = ({ items }: UniformsPanelProps) => {
    return (
        <Well className="max-h-52 overflow-y-auto">
            {items.map(props => (
                <UniformItem {...props} key={props.name} />
            ))}
        </Well>
    );
};
