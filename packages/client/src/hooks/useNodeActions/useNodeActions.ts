import { Node } from '@usealma/graph';
import { useCallback, useMemo } from 'react';

import { NodeActionProps } from '../../components/Node/Node.types';
import { useCircuit } from '../useCircuit/useCircuit';

export const useNodeActions = (node: Node): NodeActionProps[] => {
    const circuit = useCircuit();

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
        default:
            return [closeAction];
    }
};
