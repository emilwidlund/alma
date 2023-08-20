import * as React from 'react';



import { ContextMenuContainerProps } from './ContextMenuContainer.types';
import { useClickOutside } from '../../../../hooks/useClickOutside/useClickOutside';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';

export const ContextMenuContainer = ({ position, sections, onClose }: ContextMenuContainerProps) => {
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
        <div ref={ref} className="flex flex-col p-2 rounded-xl bg-neutral-300 absolute w-52 uppercase tracking-wider shadow-lg z-20 font-medium text-xxs" 
        style={position ? { top: `${position.y}px`, left: `${position.x}px` }: undefined}>
            {sections.map((section, index) => (
                <div className={"flex flex-col mt-4 first-of-type:mt-0"} key={index}>
                    {!!section.title && <span className="mt-1 pb-2 pl-3 text-xxs">{section.title}</span>}
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