import { useCallback } from 'react';

import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

export const FragmentEditor = () => {
    const { activeLayer, updateLayerContext } = useProjectContext();

    const handleFragmentChange = useCallback(
        (fragmentSource: string | undefined) => {
            if (activeLayer) {
                updateLayerContext(activeLayer.id, fragmentSource || '');
            }
        },
        [updateLayerContext, activeLayer]
    );

    return <CodeEditor value={activeLayer?.context} onChange={handleFragmentChange} />;
};
