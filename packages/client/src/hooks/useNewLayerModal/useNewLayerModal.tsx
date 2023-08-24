import { CodeOutlined, RouteOutlined, StreamOutlined } from '@mui/icons-material';
import * as React from 'react';

import { NEW_LAYER_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';

import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';
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
            className="flex flex-col items-center justify-center text-center w-40 h-40 bg-neutral-300 hover:bg-neutral-100 hover:text-accent hover:shadow-xl transition-colors rounded-3xl cursor-pointer text-4xl"
            onClick={onClick}
        >
            <Icon fontSize="inherit" />
            <h4 className="text-base mt-4">{title}</h4>
        </div>
    );
};

const NewLayerModalContent = () => {
    const { createLayer } = useProjectContext();
    const modal = React.useContext(ModalContext);
    const handleCreateCircuitProject = React.useCallback(() => {
        createLayer({
            id: Math.random().toString(),
            name: 'Untitled',
            type: 'CIRCUIT',
            enabled: true,
            blendingMode: 'NORMAL',
            context: DEFAULT_NEW_CIRCUIT_LAYER_CONTEXT
        });

        modal.close(NEW_LAYER_MODAL_ID);
    }, [modal, createLayer]);

    const handleCreateSourceProject = React.useCallback(() => {
        createLayer({
            id: Math.random().toString(),
            name: 'Untitled',
            type: 'FRAGMENT',
            enabled: true,
            blendingMode: 'NORMAL',
            context: DEFAULT_NEW_FRAGMENT_LAYER_CONTEXT
        });

        modal.close(NEW_LAYER_MODAL_ID);
    }, [modal, createLayer]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-medium mb-4">New Layer</h1>
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
            children: <NewLayerModalContent />,
            actions: [
                {
                    children: 'Close',
                    onClick: () => {
                        modal.close(NEW_LAYER_MODAL_ID);
                    }
                }
            ]
        });
    }, [modal]);

    return {
        open,
        close: modal.close
    };
};
