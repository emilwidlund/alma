import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { MouseEventHandler, useCallback } from 'react';

import { SwitchProps } from './Switch.types';

export const Switch = ({ active, onChange }: SwitchProps) => {
    const containerClassNames = clsx('relative w-6 rounded-full p-1 transition-colors cursor-pointer', {
        'bg-neutral-400': !active,
        'bg-accent': active
    });

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.stopPropagation();

        onChange?.(e);
    }, [onChange])

    return (
        <div className={containerClassNames} onClick={handleClick}>
            <motion.div
                className="rounded-full w-1 h-1 bg-neutral-100"
                initial={false}
                animate={{ x: active ? 12 : 0 }}
            />
        </div>
    );
};
