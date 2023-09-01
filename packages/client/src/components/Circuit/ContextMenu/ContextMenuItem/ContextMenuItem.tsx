import { ChevronRightOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import * as React from 'react';

import { ContextMenuItemProps } from './ContextMenuItem.types';
import { useHover } from '../../../../hooks/useHover/useHover';
import { ContextMenuContainer } from '../ContextMenuContainer/ContextMenuContainer';

export const ContextMenuItem = ({ label, icon, items, onClick, selected, select }: ContextMenuItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { onMouseEnter } = useHover(select);

    const contextMenuContainer = !!items && selected && (
        <ContextMenuContainer sections={items} position={{ x: 208, y: -8 }} />
    );

    const contextMenuItemWrapperClassNames = clsx(
        'relative flex flex-row items-center justify-between py-2 px-3 transition-colors rounded-md',
        {
            'bg-neutral-600': selected
        }
    );

    return (
        <div ref={ref} className={contextMenuItemWrapperClassNames} onMouseEnter={onMouseEnter} onClick={onClick}>
            <div className={'name-wrapper flex flex-row items-center select-none tracking-widest'}>
                {/* <Icon name={icon} size={16} color="inherit" outlined /> */}
                <span>{label}</span>
            </div>
            {!!items && <ChevronRightOutlined fontSize="inherit" />}
            {contextMenuContainer}
        </div>
    );
};
