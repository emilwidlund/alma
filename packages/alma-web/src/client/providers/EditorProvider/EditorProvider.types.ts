import { Layer } from 'alma-webgl';
import * as React from 'react';

import { Project } from '../../../generated/graphql';

export type IEditorProviderProps = React.PropsWithChildren<{
    project: Project | undefined;
}>;

export interface IEditorContextValue {
    project: Project | undefined;
    openTabs: Layer[];
    setOpenTabs(tabs: Layer[]): void;
}
