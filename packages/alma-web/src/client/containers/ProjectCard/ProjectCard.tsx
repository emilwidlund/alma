import * as dayJS from 'dayjs';
import { capitalize } from 'lodash';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { Heading } from '../../components/Heading/Heading';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useHover } from '../../hooks/useHover/useHover';
import { Size } from '../../types';
import {
    projectCardCanvasStyles,
    projectCardContentStyles,
    projectCardInfoSeparatorStyles,
    projectCardInfoStyles,
    projectCardMediaStyles,
    projectCardWrapperStyles
} from './ProjectCard.styles';
import { IProjectCardProps } from './ProjectCard.types';

export const ProjectCard = ({ index, item }: IProjectCardProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { buildCircuit } = useCircuitContext(canvasRef);
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();

    React.useEffect(() => {
        if (isHovered) {
            return buildCircuit(JSON.parse(JSON.stringify(item.circuit)));
        }
    }, [isHovered]);

    const updatedAgo = dayJS(item.updatedAt).fromNow(false);

    return (
        <div className={projectCardWrapperStyles(index)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div
                className={projectCardMediaStyles(item.mediaUrl)}
                children={
                    <CSSTransition
                        classNames="fade"
                        in={isHovered}
                        timeout={500}
                        children={
                            <canvas ref={canvasRef} className={projectCardCanvasStyles} width={320} height={240} />
                        }
                        unmountOnExit
                        mountOnEnter
                    />
                }
            />

            <div className={projectCardContentStyles}>
                <Heading size={Size.SM} marginTop={0} marginBottom={12}>
                    {item.name}
                </Heading>
                <div className={projectCardInfoStyles}>
                    <span>
                        {item.likesCount} {item.likesCount === 1 ? 'Like' : 'Likes'}
                    </span>
                    <span className={projectCardInfoSeparatorStyles}>{'·'}</span>
                    <span>{capitalize(updatedAgo)}</span>
                </div>
            </div>
        </div>
    );
};
