import { Project } from '../../generated/graphql';

export interface IProjectListContainerProps {
    header?: JSX.Element;
    projects: Project[];
}
