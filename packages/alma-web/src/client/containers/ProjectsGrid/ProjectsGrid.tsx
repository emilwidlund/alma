import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import { ProjectCard } from '../ProjectCard/ProjectCard';
import { projectsGridWrapperStyles } from './ProjectsGrid.styles';
import { IProjectsGridProps } from './ProjectsGrid.types';

export const ProjectsGrid = ({ items }: IProjectsGridProps) => {
    const { username } = useParams();

    return (
        <div className={projectsGridWrapperStyles}>
            {items.map((item, index) => (
                <Link key={item.id} to={`/${username}/${item.id}`}>
                    <ProjectCard item={item} index={index} />
                </Link>
            ))}
        </div>
    );
};
