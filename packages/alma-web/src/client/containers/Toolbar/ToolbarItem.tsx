import * as React from 'react';

import { Icon } from '../../components/Icon/Icon';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { TooltipPosition } from '../../components/Tooltip/Tooltip.types';
import { toolbarItemContainerStyles } from './ToolbarItem.styles';
import { IToolbarItemProps } from './ToolbarItem.types';

export const ToolbarItem = ({ label, icon, onClick, outlined, cta }: IToolbarItemProps) => {
    return (
        <Tooltip
            className={toolbarItemContainerStyles(cta)}
            text={label}
            position={TooltipPosition.TOP}
            offset={{ y: 15, x: 0 }}
        >
            <div onClick={onClick}>
                <Icon name={icon} outlined={outlined} size={20} />
            </div>
        </Tooltip>
    );
};
