import { useMutation, useQuery } from '@apollo/client';
import { debounce } from 'lodash';
import { useCallback } from 'react';

import { UPDATE_LAYER_MUTATION } from '~/apollo/mutations';
import { LAYER_QUERY } from '~/apollo/queries';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { useProject } from '~/providers/ProjectProvider/ProjectProvider';

export const FragmentEditor = () => {
    const { projectId, activeLayerId } = useProject();

    const { data: { layer: activeLayer } = { layer: undefined } } = useQuery(LAYER_QUERY, {
        variables: { id: activeLayerId || '' }
    });
    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION);

    const updateLayerDebounced = useCallback(debounce(updateLayer, 500), [updateLayer]);

    const handleFragmentChange = useCallback(
        (fragmentSource: string | undefined) => {
            if (activeLayerId && projectId && typeof fragmentSource === 'string') {
                updateLayerDebounced({
                    variables: {
                        projectId: projectId,
                        id: activeLayerId,
                        fragment: fragmentSource
                    },
                    optimisticResponse: {
                        updateLayer: {
                            ...activeLayer,
                            __typename: 'FragmentLayer',
                            id: activeLayerId,
                            fragment: fragmentSource
                        }
                    }
                });
            }
        },
        [activeLayer, activeLayerId, projectId, updateLayerDebounced]
    );

    if (activeLayer && 'circuit' in activeLayer) {
        return null;
    }

    return <CodeEditor value={activeLayer?.fragment} onChange={handleFragmentChange} />;
};
