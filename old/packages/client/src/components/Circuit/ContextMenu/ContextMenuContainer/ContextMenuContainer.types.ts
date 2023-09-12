import { IPoint } from '../../../../hooks/useCartesianMidpoint/useCartesianMidpoint.types';
import { ContextMenuItemProps } from '../ContextMenuItem/ContextMenuItem.types';

export interface ContextMenuContainerSection {
    title?: string;
    items: ContextMenuItemProps[];
}

export interface ContextMenuContainerProps {
    sections: ContextMenuContainerSection[];
    position?: IPoint;
    onClose?(): void;
}
