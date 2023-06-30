import { Dispatch, SetStateAction } from 'react';

import { Project } from '~/models/Project/Project.types';

export type PropertyPanelProps = {
    onFragmentCompilationError?: () => void;
};
