import { GLSLNode } from 'alma-webgl';
import * as React from 'react';
import { useCallback } from 'react';

import { GLSL_EDITOR_MODAL_ID } from '../../constants/modals';
import { GLSLModal } from '../../containers/GLSLModal/GLSLModal';
import { useModal } from '../useModal/useModal';

export const useGLSLModal = () => {
    const modal = useModal();

    const open = useCallback((node: GLSLNode) => {
        modal.open({
            id: GLSL_EDITOR_MODAL_ID,
            title: 'Edit GLSL',
            children: <GLSLModal node={node} />,
            actions: []
        });
    }, []);

    return {
        open,
        close: modal.close
    };
};
