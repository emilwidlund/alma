import { Node } from 'alma-graph';
import { GLSLNode, WebGLNodeType } from 'alma-webgl';
import { useCallback, useMemo } from 'react';

import { INodeActionProps } from '../../components/Node/Node.types';
import { useCircuit } from '../useCircuit/useCircuit';
import { useCodeModal } from '../useCodeModal/useCodeModal';

export const useNodeActions = (node: Node): INodeActionProps[] => {
    const circuit = useCircuit();
    const { open: openGLSLEditor } = useCodeModal();

    const onEditSave = useCallback(
        glsl => {
            if (node instanceof GLSLNode) {
                node.setGLSL(glsl);
            }
        },
        [node]
    );

    const onEditClick = useCallback(() => {
        if (node instanceof GLSLNode) {
            openGLSLEditor({
                content: node.data.glsl,
                onSave: onEditSave
            });
        }
    }, [node, openGLSLEditor, onEditSave]);

    const editNodeAction = useMemo(
        () => ({
            icon: 'code',
            onClick: onEditClick
        }),
        [onEditClick, onEditSave]
    );

    const onClose = useCallback(() => {
        if (circuit.selectedNodes?.indexOf(node) !== -1) {
            circuit.setSelectedNodes([]);
        }

        node.dispose();
    }, [circuit, node]);

    const closeAction = useMemo(
        () => ({
            icon: 'close',
            onClick: onClose
        }),
        [onClose]
    );

    switch (node.type) {
        case WebGLNodeType.GLSL:
        case WebGLNodeType.CREATION_EFFECT:
            return [editNodeAction, closeAction];
        default:
            return [closeAction];
    }
};
