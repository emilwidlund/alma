import { Dispatch, SetStateAction } from 'react';
import { Project } from '~/models/Project/Project.types';

export type PropertyPanelProps = {
    project: Project;
    fragmentSource: string;
    activeLayerIndex: number;
    setActiveLayerIndex: Dispatch<SetStateAction<number>>;
    onFragmentCompilationError?: () => void;
};
