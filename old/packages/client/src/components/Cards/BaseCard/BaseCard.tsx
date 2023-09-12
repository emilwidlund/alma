import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { BaseCardProps } from './BaseCard.types';

export const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>((props, ref) => {
    const classNames = clsx('flex flex-col rounded-3xl p-3 bg-neutral-800', props.className);
    return <div ref={ref} {...props} className={classNames} />;
});

BaseCard.displayName = 'BaseCard';
