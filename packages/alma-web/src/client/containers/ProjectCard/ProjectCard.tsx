import * as dayJS from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import * as React from 'react';

dayJS.extend(relativeTime);

import { Heading } from '../../components/Heading/Heading';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useHover } from '../../hooks/useHover/useHover';
import { Size } from '../../types';
import {
    projectCardCanvasStyles,
    projectCardContentStyles,
    projectCardMediaStyles,
    projectCardUpdatedAtStyles,
    projectCardWrapperStyles
} from './ProjectCard.styles';
import { IProjectCardProps } from './ProjectCard.types';

export const ProjectCard = ({ item }: IProjectCardProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { buildContext } = useCircuitContext(canvasRef);
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();

    React.useEffect(() => {
        if (isHovered) {
            buildContext(JSON.parse(JSON.stringify(item.circuit)));
        }
    }, [isHovered]);

    const updatedAgo = dayJS(item.updatedAt).fromNow(false);

    return (
        <div className={projectCardWrapperStyles} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isHovered ? (
                <canvas ref={canvasRef} className={projectCardCanvasStyles} width={320} height={360} />
            ) : (
                <div className={projectCardMediaStyles(item.mediaUrl)} />
            )}
            <div className={projectCardContentStyles}>
                <Heading size={Size.SM} marginTop={0} marginBottom={12}>
                    {item.name}
                </Heading>
                <span className={projectCardUpdatedAtStyles}>{capitalize(updatedAgo)}</span>
            </div>
        </div>
    );
};
