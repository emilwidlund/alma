
import { StreamOutlined, TextSnippetOutlined } from '@mui/icons-material';
import * as React from 'react';

import { NEW_LAYER_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';

import { useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';
import { DEFAULT_NEW_CIRCUIT_LAYER_CONTEXT, DEFAULT_NEW_FRAGMENT_LAYER_CONTEXT } from '~/templates/layer';


const SelectionBox = ({ icon: Icon, title, onClick }: {icon: typeof StreamOutlined; title: string; onClick: React.MouseEventHandler<HTMLDivElement> | undefined}) => {
    return (
        <div className='flex-1 flex-col items-center justify-center text-center p-12 bg-neutral-300 hover:bg-neutral-400 transition-colors rounded-2xl' onClick={onClick}>
            <Icon fontSize="large" />
            <h4 className='text-lg font-medium mt-4'>{title}</h4>
        </div>
    );
}

const NewLayerModalContent = () => {
    const { createLayer } = useProjectContext();
    const modal = React.useContext(ModalContext);
    const handleCreateCircuitProject = React.useCallback( () => {
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
            <h1 className='text-xl font-medium mb-4'>
                New Layer
            </h1>
            <p>
                Select which kind of layer you would like to create
            </p>
            <div className="flex flex-row items-center justify-center gap-4 mt-8 flex-wrap">
                <SelectionBox
                    icon={StreamOutlined}
                    title="Circuit"
                    onClick={handleCreateCircuitProject}
                />
                <SelectionBox
                    icon={TextSnippetOutlined}
                    title="Code"
                    onClick={handleCreateSourceProject}
                />
            </div>
        </div>
    );
};

export const useNewLayerModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        () => {
            modal.queue({
                id: NEW_LAYER_MODAL_ID,
                title: '',
                children: <NewLayerModalContent />,
                actions: [
                    {
                        children: 'Close',
                        onPress: () => {
                            modal.close(NEW_LAYER_MODAL_ID);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    return {
        open,
        close: modal.close
    };
};
