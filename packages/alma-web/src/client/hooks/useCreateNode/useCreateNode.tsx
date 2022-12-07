import { Node } from 'alma-graph';
import { ClassConstructor, GLSLNode, WebGLContext } from 'alma-webgl';
import * as React from 'react';

import { IPoint } from '../useCartesianMidpoint/useCartesianMidpoint.types';
import { useCodeModal } from '../useCodeModal/useCodeModal';

export const useCreateNode = (context?: WebGLContext, position?: IPoint) => {
    const { open: openGLSLModal } = useCodeModal();

    const createNode = React.useCallback(
        (node: ClassConstructor<Node>) => {
            switch (node) {
                case GLSLNode:
                    openGLSLModal({
                        onSave: glsl => {
                            if (context) {
                                new GLSLNode(context, { data: { glsl, position: position || { x: 0, y: 0 } } });
                            }
                        }
                    });
                    break;
                default:
                    new node(context, { data: { position } });
                    break;
            }
        },
        [position, openGLSLModal, context]
    );

    return createNode;
};
