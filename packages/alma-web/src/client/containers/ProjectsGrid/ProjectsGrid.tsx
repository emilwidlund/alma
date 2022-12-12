import * as React from 'react';

import { ProjectCard } from '../ProjectCard/ProjectCard';
import { projectsGridWrapperStyles } from './ProjectsGrid.styles';
import { IProjectsGridProps } from './ProjectsGrid.types';

export const ProjectsGrid = ({ items }: IProjectsGridProps) => {
    return (
        <div className={projectsGridWrapperStyles}>
            {items.map(item => (
                <ProjectCard key={item.id} item={item} />
            ))}
        </div>
    );
};
