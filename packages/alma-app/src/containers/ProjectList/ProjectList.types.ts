import { IProjectCardProps } from '../../components/ProjectCard/ProjectCard.types';

export interface IProjectListItemProps extends IProjectCardProps {
    vertexShaderSource: string;
    fragmentShaderSource: string;
}

export interface IProjectListContainerProps {
    header?: JSX.Element;
    projects: IProjectListItemProps[];
}
