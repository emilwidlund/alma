import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';
import { useCallback } from 'react';

import UPDATE_LAYER_MUTATION from '~/apollo/mutations/updateLayer.gql';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';
import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';

export const FragmentEditor = () => {
    const { project, activeLayer } = useProjectContext();
    const [updateLayer] = useMutation(UPDATE_LAYER_MUTATION);

    const updateLayerDebounced = useCallback(debounce(updateLayer, 500), [updateLayer]);

    const handleFragmentChange = useCallback(
        (fragmentSource: string | undefined) => {
            if (activeLayer) {
                updateLayerDebounced({
                    variables: {
                        projectId: project?.id,
                        id: activeLayer.id,
                        fragment: fragmentSource
                    },
                    optimisticResponse: {
                        updateLayer: {
                            __typename: 'FragmentLayer',
                            id: activeLayer.id,
                            fragment: fragmentSource
                        }
                    }
                });
            }
        },
        [activeLayer, project?.id, updateLayerDebounced]
    );

    if (activeLayer && 'circuit' in activeLayer) {
        return null;
    }

    return <CodeEditor value={activeLayer?.fragment} onChange={handleFragmentChange} />;
};
