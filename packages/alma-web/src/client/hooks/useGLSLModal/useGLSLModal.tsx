import { GLSLNode } from 'alma-webgl';
import { noop } from 'lodash';
import * as React from 'react';

import { GLSL_EDITOR_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { Size } from '../../types';
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
                    },
                    size: Size.MD
                }
            ]
        });
    }, []);

    return (
        <>
            <textarea value={glsl} onChange={onChange}></textarea>
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
                actions: [{ label: 'Save', onPress: noop, size: Size.MD }]
            });
        },
        [modal]
    );

    return {
        open,
        close: modal.close
    };
};
