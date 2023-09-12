import { Node } from '@usealma/graph';
import { ClassConstructor, GLSLNode, Processor, WebGLContext } from '@usealma/webgl';
import * as React from 'react';

import { IPoint } from '../useCartesianMidpoint/useCartesianMidpoint.types';
import { useGLSLModal } from '../useGLSLModal/useGLSLModal';

const processor = new Processor();

export const useCreateNode = (context?: WebGLContext, position?: IPoint) => {
    const { open: openGLSLModal } = useGLSLModal();

    const createNode = React.useCallback(
        (node: ClassConstructor<Node>) => {
            switch (node) {
                case GLSLNode:
                    openGLSLModal({
                        onSave: (glsl = '') => {
                            try {
                                processor.parse(glsl);

                                if (context) {
                                    new GLSLNode(context, {
                                        data: { glsl, position: position || { x: 0, y: 0 } }
                                    });
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    });
                    break;
                default:
                    new node(context, { data: { position } });
                    break;
            }
        },
        [openGLSLModal, context, position]
    );

    return createNode;
};
