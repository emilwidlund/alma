import { Layer } from 'alma-webgl';
import { noop } from 'lodash';
import * as React from 'react';

import type { IEditorContextValue, IEditorProviderProps } from './EditorProvider.types';

const defaultEditorValue: IEditorContextValue = {
    project: undefined,
    openTabs: [],
    setOpenTabs: noop
};

export const EditorContext = React.createContext(defaultEditorValue);

export const EditorProvider = ({ project, children }: IEditorProviderProps) => {
    const [openTabs, setOpenTabs] = React.useState<Layer[]>([]);

    const value = React.useMemo<IEditorContextValue>(
        () => ({
            project,
            openTabs,
            setOpenTabs
        }),
        [project, openTabs, setOpenTabs]
    );

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};
