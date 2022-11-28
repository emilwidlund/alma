import * as React from 'react';

import { Icon } from '../../Icon/Icon';
import { contextMenuItemLabelStyles, contextMenuItemWrapperStyles } from './ContextMenuItem.styles';
import { IContextMenuItemProps } from './ContextMenuItem.types';

export const ContextMenuItem = ({ label, icon, onClick }: IContextMenuItemProps) => {
    return (
        <div className={contextMenuItemWrapperStyles} onClick={onClick}>
            <Icon name={icon} size={16} color="inherit" />
            <span className={contextMenuItemLabelStyles}>{label}</span>
        </div>
    );
};
