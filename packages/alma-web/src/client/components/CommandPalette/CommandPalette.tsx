import { lowerCase } from 'lodash';
import * as React from 'react';

import { useMultiKeyPress } from '../../hooks/useMultiPress/useMultiPress';
import {
    commandPaletteFooterStyles,
    commandPaletteInputStyles,
    commandPaletteWrapperStyles
} from './CommandPalette.styles';
import { ICommandLineProps } from './CommandPalette.types';
import { CommandPaletteItem } from './CommandPaletteItem/CommandPaletteItem';

export const CommandPalette = ({ items, onClose }: ICommandLineProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [filterQuery, setFilterQuery] = React.useState<string>('');
    const keysPressed = useMultiKeyPress();

    const commandItems = React.useMemo(
        () => items.filter(item => lowerCase(item.label).includes(lowerCase(filterQuery))),
        [filterQuery, items]
    );

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    const handleBlur = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            onClose?.();
        },
        [onClose]
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Esc
            if (e.keyCode === 27) {
                onClose?.();
            }

            // Arrow Down
            if (e.keyCode === 40 && activeIndex < commandItems.length - 1) {
                setActiveIndex(activeIndex + 1);
            }

            // Arrow Up
            if (e.keyCode === 38 && activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            }

            // Enter
            if (e.keyCode === 13 && commandItems[activeIndex]) {
                commandItems[activeIndex].onSelect();
                onClose?.();
            }
        },
        [onClose, activeIndex, commandItems]
    );

    const handleFilter = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterQuery(e.target.value);
        },
        [setFilterQuery]
    );

    return (
        <div className={commandPaletteWrapperStyles}>
            <div className={commandPaletteInputStyles}>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                    value={filterQuery}
                    onChange={handleFilter}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className={commandPaletteFooterStyles}>
                {commandItems.map((item, index) => (
                    <CommandPaletteItem
                        key={item.label}
                        active={index === activeIndex}
                        label={item.label}
                        shortcut={item.shortcut}
                        onSelect={item.onSelect}
                        keysPressed={keysPressed}
                    />
                ))}
            </div>
        </div>
    );
};
