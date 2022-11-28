import { cx } from '@emotion/css';
import * as React from 'react';

import { useHover } from '../../../hooks/useHover/useHover';
import { Icon } from '../../Icon/Icon';
import { ContextMenuContainer } from '../ContextMenuContainer/ContextMenuContainer';
import {
    contextMenuItemLabelStyles,
    contextMenuItemNameWrapperStyles,
    contextMenuItemWrapperStyles
} from './ContextMenuItem.styles';
import { IContextMenuItemProps } from './ContextMenuItem.types';

export const ContextMenuItem = ({ label, icon, items, onClick, selected, select }: IContextMenuItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { onMouseEnter } = useHover(select);

    const contextMenuContainer = !!items && selected && (
        <ContextMenuContainer sections={items} position={{ x: 238, y: -10 }} />
    );

    return (
        <div ref={ref} className={contextMenuItemWrapperStyles(selected)} onMouseEnter={onMouseEnter} onClick={onClick}>
            <div className={cx(contextMenuItemNameWrapperStyles, 'name-wrapper')}>
                <Icon name={icon} size={16} color="inherit" outlined />
                <span className={contextMenuItemLabelStyles}>{label}</span>
            </div>
            {!!items && <Icon name="chevron_right" size={16} color="inherit" />}
            {contextMenuContainer}
        </div>
    );
};
