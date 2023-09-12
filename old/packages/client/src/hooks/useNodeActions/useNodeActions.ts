import { Node } from '@usealma/graph';
import { GLSLNode, WebGLNodeType } from '@usealma/webgl';
import { useCallback, useMemo } from 'react';

import { NodeActionProps } from '../../components/Circuit/Node/Node.types';
import { useCircuit } from '../useCircuit/useCircuit';
import { useGLSLModal } from '~/hooks/useGLSLModal/useGLSLModal';

export const useNodeActions = (node: Node): NodeActionProps[] => {
    const circuit = useCircuit();
    const { open: openGLSLModal } = useGLSLModal();

    const onEditSave = useCallback(
        (glsl: string) => {
            if (node instanceof GLSLNode) {
                node.setGLSL(glsl);
            }
        },
        [node]
    );

    const onEditClick = useCallback(() => {
        if (node instanceof GLSLNode) {
            openGLSLModal({
                content: node.data.glsl,
                onSave: onEditSave
            });
        }
    }, [node, openGLSLModal, onEditSave]);

    const editNodeAction = useMemo(
        () => ({
            color: 'bg-accent',
            icon: 'code',
            onClick: onEditClick
        }),
        [onEditClick]
    );

    const onClose = useCallback(() => {
        if (circuit.selectedNodes?.indexOf(node) !== -1) {
            circuit.setSelectedNodes([]);
        }

        node.dispose();
    }, [circuit, node]);

    const closeAction = useMemo(
        () => ({
            color: 'bg-red-500',
            icon: 'close',
            onClick: onClose
        }),
        [onClose]
    );

    switch (node.type) {
        case WebGLNodeType.GLSL:
            return [editNodeAction, closeAction];
        default:
            return [closeAction];
    }
};
