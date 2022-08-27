import { IProjectCardProps } from '../../components/ProjectCard/ProjectCard.types';

export interface IProjectListItemProps extends IProjectCardProps {
    vertexShaderSource: string;
    fragmentShaderSource: string;
}

export interface IProjectListContainerProps {
    projects: IProjectListItemProps[];
}
