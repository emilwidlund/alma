import { clsx } from 'clsx';
import { motion } from 'framer-motion';

import { SwitchProps } from './Switch.types';

export const Switch = ({ active, onChange }: SwitchProps) => {
    const bulletClassNames = clsx('rounded-full w-2 h-2', {
        'bg-accent': active,
        'bg-neutral-100': !active
    });

    return (
        <div className="relative w-8 bg-neutral-400 rounded-full p-1" onClick={onChange}>
            <motion.div className={bulletClassNames} initial={false} animate={{ x: active ? 16 : 0 }} />
        </div>
    );
};
