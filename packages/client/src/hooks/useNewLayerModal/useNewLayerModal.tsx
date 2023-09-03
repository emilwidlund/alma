import { useMutation } from '@apollo/client';
import { CodeOutlined, RouteOutlined, StreamOutlined } from '@mui/icons-material';
import * as React from 'react';

import { NEW_LAYER_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { LayerType } from '~/apollo/generated/graphql';
import { CREATE_LAYER_MUTATION } from '~/apollo/mutations';
import { PROJECT_QUERY } from '~/apollo/queries';
import { useProject } from '~/providers/ProjectProvider/ProjectProvider';
import { DEFAULT_NEW_CIRCUIT_LAYER_CONTEXT, DEFAULT_NEW_FRAGMENT_LAYER_CONTEXT } from '~/templates/layer';

const SelectionBox = ({
    icon: Icon,
    title,
    onClick
}: {
    icon: typeof StreamOutlined;
    title: string;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
    return (
        <div
            className="flex flex-col items-center justify-center text-center w-40 h-40 bg-neutral-600 hover:bg-neutral-500 hover:text-slate-300 hover:shadow-xl transition-colors rounded-3xl cursor-pointer text-4xl"
            onClick={onClick}
        >
            <Icon fontSize="inherit" />
            <h4 className="text-base mt-4">{title}</h4>
        </div>
    );
};

const NewLayerModalContent = () => {
    const { projectId } = useProject();
    const modal = React.useContext(ModalContext);

    const [createLayer] = useMutation(CREATE_LAYER_MUTATION, {
        refetchQueries: [{ query: PROJECT_QUERY, variables: { id: projectId } }]
    });

    const handleCreateCircuitProject = React.useCallback(() => {
        if (projectId) {
            createLayer({
                variables: {
                    projectId: projectId,
                    type: LayerType.Circuit,
                    circuit: DEFAULT_NEW_CIRCUIT_LAYER_CONTEXT
                }
            });

            modal.close(NEW_LAYER_MODAL_ID);
        }
    }, [createLayer, modal, projectId]);

    const handleCreateSourceProject = React.useCallback(() => {
        if (projectId) {
            createLayer({
                variables: {
                    projectId: projectId,
                    type: LayerType.Fragment,
                    fragment: DEFAULT_NEW_FRAGMENT_LAYER_CONTEXT
                }
            });

            modal.close(NEW_LAYER_MODAL_ID);
        }
    }, [createLayer, projectId, modal]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-medium mb-4 text-slate-100">New Layer</h1>
            <p>Select which kind of layer you would like to create</p>
            <div className="flex flex-row items-center mt-12 flex-wrap gap-x-6">
                <SelectionBox icon={RouteOutlined} title="Circuit" onClick={handleCreateCircuitProject} />
                <SelectionBox icon={CodeOutlined} title="Fragment" onClick={handleCreateSourceProject} />
            </div>
        </div>
    );
};

export const useNewLayerModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(() => {
        modal.queue({
            id: NEW_LAYER_MODAL_ID,
            title: '',
            children: <NewLayerModalContent />
        });
    }, [modal]);

    return {
        open,
        close: modal.close
    };
};
