import { useCallback } from 'react';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

export const FragmentEditor = () => {
    const { project, activeLayer, updateLayer } = useProjectContext();

    const handleFragmentChange = useCallback(
        (fragmentSource: string | undefined) => {
            if (activeLayer) {
                updateLayer({ ...activeLayer, context: fragmentSource || '' });
            }
        },
        [project, updateLayer, activeLayer]
    );

    return <CodeEditor value={activeLayer?.context} onChange={handleFragmentChange} />;
};
