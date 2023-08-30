import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { MouseEventHandler, useCallback } from 'react';

import { SwitchProps } from './Switch.types';

export const Switch = ({ active, onChange, disabled }: SwitchProps) => {
    const containerClassNames = clsx('relative w-6 rounded-full p-1 transition-colors cursor-pointer', {
        'bg-neutral-800': !active,
        'bg-neutral-400': active,
        'opacity-30': disabled
    });

    const dotClassNames = clsx('rounded-full w-1 h-1', {
        'bg-accent': active,
        'bg-neutral-300': !active
    });

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
        e => {
            e.stopPropagation();

            if (!disabled) {
                onChange?.(e);
            }
        },
        [onChange, disabled]
    );

    return (
        <div className={containerClassNames} onClick={handleClick}>
            <motion.div className={dotClassNames} initial={false} animate={{ x: active ? 12 : 0 }} />
        </div>
    );
};
