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

export const ContextMenuItem = ({ label, icon, items, onClick }: IContextMenuItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { onMouseEnter, onMouseLeave, isHovered } = useHover();

    const itemsPosition = React.useMemo(() => {
        if (ref.current) {
            return {
                x: 230,
                y: -14
            };
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }, [ref.current]);

    return (
        <div
            ref={ref}
            className={contextMenuItemWrapperStyles}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <div className={cx(contextMenuItemNameWrapperStyles, 'name-wrapper')}>
                <Icon name={icon} size={16} color="inherit" outlined />
                <span className={contextMenuItemLabelStyles}>{label}</span>
            </div>
            {!!items && <Icon name="chevron_right" size={16} color="inherit" />}
            {!!items && isHovered && <ContextMenuContainer position={itemsPosition} sections={items} />}
        </div>
    );
};
