import * as dayJS from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import * as React from 'react';

dayJS.extend(relativeTime);

import { Heading } from '../../components/Heading/Heading';
import { Size } from '../../types';
import {
    projectCardContentStyles,
    projectCardMediaStyles,
    projectCardUpdatedAtStyles,
    projectCardWrapperStyles
} from './ProjectCard.styles';
import { IProjectCardProps } from './ProjectCard.types';

export const ProjectCard = ({ item }: IProjectCardProps) => {
    const updatedAgo = dayJS(item.updatedAt).fromNow(false);

    return (
        <div className={projectCardWrapperStyles}>
            <div className={projectCardMediaStyles(item.mediaUrl)} />
            <div className={projectCardContentStyles}>
                <Heading size={Size.SM} marginTop={0} marginBottom={12}>
                    {item.name}
                </Heading>
                <span className={projectCardUpdatedAtStyles}>{capitalize(updatedAgo)}</span>
            </div>
        </div>
    );
};
