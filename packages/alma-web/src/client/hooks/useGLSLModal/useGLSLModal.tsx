import { GLSLNode } from 'alma-webgl';
import { noop } from 'lodash';
import * as React from 'react';

import { TextArea } from '../../components/TextArea/TextArea';
import { GLSL_EDITOR_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { IGLSLModalContentProps } from './useGLSLModal.types';

export const GLSLModalContent = ({ node }: IGLSLModalContentProps) => {
    const [glsl, setGLSL] = React.useState('');
    const modal = React.useContext(ModalContext);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGLSL(e.target.value);

        modal.update({
            actions: [
                {
                    label: 'Save',
                    onPress: () => {
                        node.setGLSL(e.target.value);
                        modal.close(GLSL_EDITOR_MODAL_ID);
                    }
                }
            ]
        });
    }, []);

    return (
        <>
            <TextArea value={glsl} onChange={onChange} />
        </>
    );
};

export const useGLSLModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        (node: GLSLNode) => {
            modal.queue({
                id: GLSL_EDITOR_MODAL_ID,
                title: 'Edit GLSL',
                children: <GLSLModalContent node={node} />,
                actions: [{ label: 'Save', onPress: noop }]
            });
        },
        [modal]
    );

    return {
        open,
        close: modal.close
    };
};
