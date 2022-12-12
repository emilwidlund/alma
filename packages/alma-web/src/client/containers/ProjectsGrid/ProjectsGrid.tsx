import * as React from 'react';
import { Link } from 'react-router-dom';

import { ProjectCard } from '../ProjectCard/ProjectCard';
import { projectsGridWrapperStyles } from './ProjectsGrid.styles';
import { IProjectsGridProps } from './ProjectsGrid.types';

export const ProjectsGrid = ({ items }: IProjectsGridProps) => {
    return (
        <div className={projectsGridWrapperStyles}>
            {items.map((item, index) => (
                <Link key={item.id} to={`/project/${item.id}`}>
                    <ProjectCard item={item} index={index} />
                </Link>
            ))}
        </div>
    );
};
