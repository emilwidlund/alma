import * as React from 'react';

import { useHover } from '../../hooks/useHover/useHover';
import { tooltipWrapperStyles, tooltipNodeWrapperStyles } from './Tooltip.styles';
import { ITooltipNodeProps, ITooltipProps } from './Tooltip.types';

const TooltipNode = ({ text, position, offset }: ITooltipNodeProps) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const { width, height } = ref.current?.getBoundingClientRect() || { width: 0, height: 0 };

        setDimensions({ width, height });
    }, []);

    return (
        <span ref={ref} className={tooltipNodeWrapperStyles(position, dimensions, offset)}>
            {text}
        </span>
    );
};

export const Tooltip = ({ children, ...tooltipNodeProps }: ITooltipProps) => {
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();

    return (
        <div className={tooltipWrapperStyles}>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {children}
            </div>
            {isHovered && <TooltipNode {...tooltipNodeProps} />}
        </div>
    );
};
