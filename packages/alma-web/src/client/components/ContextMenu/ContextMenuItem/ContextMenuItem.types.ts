import * as React from 'react';

import { IContextMenuContainerSection } from '../ContextMenuContainer/ContextMenuContainer.types';

export interface IContextMenuItemProps {
    label: string;
    icon: string;
    items?: IContextMenuContainerSection[];
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    selected?: boolean;
    select?(): void;
}
