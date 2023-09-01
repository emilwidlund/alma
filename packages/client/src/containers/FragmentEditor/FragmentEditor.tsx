import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';
import { useCallback } from 'react';

import { UPDATE_LAYER_MUTATION } from '~/apollo/mutations';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { useProject } from '~/providers/ProjectProvider/ProjectProvider';

export const FragmentEditor = () => {
    const { project, activeLayer } = useProject();
    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION);

    const updateLayerDebounced = useCallback(debounce(updateLayer, 500), [updateLayer]);

    const handleFragmentChange = useCallback(
        (fragmentSource: string | undefined) => {
            if (activeLayer && project && typeof fragmentSource === 'string') {
                updateLayerDebounced({
                    variables: {
                        projectId: project?.id,
                        id: activeLayer.id,
                        fragment: fragmentSource
                    },
                    optimisticResponse: {
                        updateLayer: {
                            ...activeLayer,
                            __typename: 'FragmentLayer',
                            id: activeLayer.id,
                            fragment: fragmentSource
                        }
                    }
                });
            }
        },
        [activeLayer, project, updateLayerDebounced]
    );

    if (activeLayer && 'circuit' in activeLayer) {
        return null;
    }

    return <CodeEditor value={activeLayer?.fragment} onChange={handleFragmentChange} />;
};
