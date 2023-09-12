import * as React from 'react';

import { ContextMenuContainerSection } from '../ContextMenuContainer/ContextMenuContainer.types';

export interface ContextMenuItemProps {
    label: string;
    icon: string;
    items?: ContextMenuContainerSection[];
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    selected?: boolean;
    select?(): void;
}
