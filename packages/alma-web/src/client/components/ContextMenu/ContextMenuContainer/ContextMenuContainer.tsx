import * as React from 'react';

import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import {
    contextMenuContainerStyles,
    contextMenuSectionStyles,
    contextMenuSectionTitleStyles
} from './ContextMenuContainer.styles';
import { IContextMenuContainerProps } from './ContextMenuContainer.types';

export const ContextMenuContainer = ({ position, sections }: IContextMenuContainerProps) => {
    return (
        <div className={contextMenuContainerStyles(position)}>
            {sections.map((section, index) => (
                <div className={contextMenuSectionStyles} key={index}>
                    {!!section.title && <span className={contextMenuSectionTitleStyles}>{section.title}</span>}
                    {section.items.map(item => (
                        <ContextMenuItem key={item.label} {...item} />
                    ))}
                </div>
            ))}
        </div>
    );
};
