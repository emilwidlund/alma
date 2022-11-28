import * as React from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import {
    contextMenuContainerStyles,
    contextMenuSectionStyles,
    contextMenuSectionTitleStyles
} from './ContextMenuContainer.styles';
import { IContextMenuContainerProps } from './ContextMenuContainer.types';

export const ContextMenuContainer = ({ position, sections, onClose }: IContextMenuContainerProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string | undefined>(undefined);

    useClickOutside(ref, onClose);

    const closeOnEscapeKey = React.useCallback(
        (e: KeyboardEvent) => (e.key === 'Escape' ? onClose?.() : null),
        [onClose]
    );

    React.useEffect(() => {
        document.body.classList.add('modal-open');
        document.body.addEventListener('keydown', closeOnEscapeKey);

        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
            document.body.classList.remove('modal-open');
        };
    }, [closeOnEscapeKey]);

    return (
        <div ref={ref} className={contextMenuContainerStyles(position)}>
            {sections.map((section, index) => (
                <div className={contextMenuSectionStyles} key={index}>
                    {!!section.title && <span className={contextMenuSectionTitleStyles}>{section.title}</span>}
                    {section.items.map(item => (
                        <ContextMenuItem
                            key={item.label}
                            {...item}
                            selected={item.label === selectedItem}
                            select={() => setSelectedItem(item.label)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
