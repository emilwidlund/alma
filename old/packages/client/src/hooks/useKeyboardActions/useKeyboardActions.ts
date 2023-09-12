import { nodes as webglNodes } from '@usealma/webgl';
import * as React from 'react';

import { KeyboardAction } from './useKeyboardAction.types';
import { useCircuit } from '../useCircuit/useCircuit';

import { KeyboardKey } from '~/types';

export const useKeyboardActions = () => {
    const circuit = useCircuit();

    const removeNodes = React.useCallback(() => {
        for (const node of circuit.selectedNodes || []) {
            node.dispose();
        }
    }, [circuit]);

    const selectAllNodes = React.useCallback(
        (e: KeyboardEvent) => {
            if (circuit.context) {
                e.preventDefault();
                const nodes = Array.from(circuit.context.nodes.values() || []);
                circuit.setSelectedNodes(nodes);
            }
        },
        [circuit]
    );

    const deselectAllNodes = React.useCallback(() => {
        if (circuit.selectedNodes?.length) {
            circuit.setSelectedNodes([]);
        }
    }, [circuit]);

    const duplicateSelectedNodes = React.useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            const newlyCreated = [];

            for (const node of circuit.selectedNodes || []) {
                const nodeConstructor = webglNodes[node.type];

                const newNode = new nodeConstructor(circuit.context, {
                    data: { position: { x: node.data.position.x + 100, y: node.data.position.y + 100 } }
                });

                newlyCreated.push(newNode);
            }

            circuit.setSelectedNodes(newlyCreated);
        },
        [circuit]
    );

    const actions: KeyboardAction[] = React.useMemo(
        () => [
            /** Remove Nodes */
            {
                key: KeyboardKey.Delete,
                callback: removeNodes
            },
            {
                key: KeyboardKey.Backspace,
                callback: removeNodes
            },

            /** Select Nodes */
            {
                modifier: 'metaKey',
                key: 'a',
                callback: selectAllNodes
            },
            {
                modifier: 'ctrlKey',
                key: 'a',
                callback: selectAllNodes
            },

            /** Deselect Nodes */
            {
                key: KeyboardKey.Escape,
                callback: deselectAllNodes
            },

            /** Duplicate Nodes */
            {
                modifier: 'metaKey',
                key: 'd',
                callback: duplicateSelectedNodes
            },
            {
                modifier: 'ctrlKey',
                key: 'd',
                callback: duplicateSelectedNodes
            }
        ],
        [removeNodes, selectAllNodes, deselectAllNodes, duplicateSelectedNodes]
    );

    const downHandler = React.useCallback(
        (e: KeyboardEvent) => {
            for (const action of actions) {
                if (action.key === e.key) {
                    if (action.modifier && !e[action.modifier]) continue;
                    action.callback(e);
                }
            }
        },
        [actions]
    );

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    }, [circuit, downHandler]);
};
