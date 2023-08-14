import { Node } from '@usealma/graph';
import { ClassConstructor, WebGLContext } from '@usealma/webgl';
import * as React from 'react';

import { IPoint } from '../useCartesianMidpoint/useCartesianMidpoint.types';

export const useCreateNode = (context?: WebGLContext, position?: IPoint) => {
    const createNode = React.useCallback(
        (node: ClassConstructor<Node>) => {
            switch (node) {
                default:
                    new node(context, { data: { position } });
                    break;
            }
        },
        [position, context]
    );

    return createNode;
};
