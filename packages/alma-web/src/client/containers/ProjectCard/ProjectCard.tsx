import * as React from 'react';

import { Heading } from '../../components/Heading/Heading';
import { Size } from '../../types';
import { projectCardContentStyles, projectCardMediaStyles, projectCardWrapperStyles } from './ProjectCard.styles';
import { IProjectCardProps } from './ProjectCard.types';

export const ProjectCard = ({ item }: IProjectCardProps) => {
    return (
        <div className={projectCardWrapperStyles}>
            <div className={projectCardMediaStyles(item.mediaUrl)} />
            <div className={projectCardContentStyles}>
                <Heading size={Size.SM} marginTop={0}>
                    {item.name}
                </Heading>
                <span>{item.owner.username}</span>
            </div>
        </div>
    );
};
