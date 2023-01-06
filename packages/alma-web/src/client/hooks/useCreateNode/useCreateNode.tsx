import { Node } from 'alma-graph';
import { ClassConstructor, GLSLNode, Circuit } from 'alma-webgl';
import * as React from 'react';

import { IPoint } from '../useCartesianMidpoint/useCartesianMidpoint.types';
import { useCodeModal } from '../useCodeModal/useCodeModal';

export const useCreateNode = (circuit?: Circuit, position?: IPoint) => {
    const { open: openGLSLModal } = useCodeModal();

    const createNode = React.useCallback(
        (node: ClassConstructor<Node>) => {
            switch (node) {
                case GLSLNode:
                    openGLSLModal({
                        onSave: glsl => {
                            if (circuit) {
                                new GLSLNode(circuit, { data: { glsl, position: position || { x: 0, y: 0 } } });
                            }
                        }
                    });
                    break;
                default:
                    new node(circuit, { data: { position } });
                    break;
            }
        },
        [position, openGLSLModal, circuit]
    );

    return createNode;
};
