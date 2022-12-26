import { WebGLContext } from 'alma-webgl';

import { Project } from '../../../generated/graphql';

export interface IProjectHeaderContainerProps {
    project: Project;
    isDirty: boolean;
    setIsDirty(isDirty: boolean): void;
    circuit?: WebGLContext;
    source?: string;
}
