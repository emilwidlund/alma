import { Input, Node, Output } from '@usealma/graph';
import { noop } from 'lodash';
import * as React from 'react';

import { CIRCUIT_SIZE, NODE_CENTER } from '../../constants/circuit';
import { normalizeBounds, withinBounds } from '../../utils/bounds/bounds';
import { IBounds } from '../../utils/bounds/bounds.types';
import { fromCartesianPoint } from '../../utils/coordinates/coordinates';
import type { ICircuitContextValue, ICircuitProviderProps } from './CircuitProvider.types';

const defaultCircuitValue: ICircuitContextValue = {
    context: undefined,
    nodeElements: {},
    setNodeElement: noop,
    removeNodeElement: noop,
    portElements: {},
    setPortElement: noop,
    removePortElement: noop,
    connectionDraft: undefined,
    setConnectionDraft: noop,
    commitConnectionDraft: noop,
    selectedNodes: [],
    setSelectedNodes: noop,
    selectionBounds: undefined,
    setSelectionBounds: noop
};

export const CircuitContext = React.createContext(defaultCircuitValue);

export const CircuitProvider = ({ context, children }: ICircuitProviderProps) => {
    const [nodeElements, setNodeElements] = React.useState<Record<string, HTMLDivElement>>({});
    const [portElements, setPortElements] = React.useState<Record<string, HTMLDivElement>>({});
    const [connectionDraft, setConnectionDraft] = React.useState<Output<any> | undefined>();
    const [selectedNodes, setSelectedNodes] = React.useState<Node[] | undefined>([]);
    const [selectionBounds, setSelectionBounds] = React.useState<IBounds | undefined>(undefined);

    const handleSetNodeElement = React.useCallback(
        (nodeId: string, nodeElement: HTMLDivElement) => {
            setNodeElements(nodeElements => {
                const elements = { ...nodeElements };
                elements[nodeId] = nodeElement;

                return elements;
            });
        },
        [setNodeElements]
    );

    const handleRemoveNodeElement = React.useCallback(
        (nodeId: string) => {
            setNodeElements(portElements => {
                const elements = { ...portElements };
                delete elements[nodeId];

                return elements;
            });
        },
        [setNodeElements]
    );

    const handleSetPortElement = React.useCallback(
        (portId: string, portElement: HTMLDivElement) => {
            setPortElements(portElements => {
                const elements = { ...portElements };
                elements[portId] = portElement;

                return elements;
            });
        },
        [setPortElements]
    );

    const handleRemovePortElement = React.useCallback(
        (portId: string) => {
            setPortElements(portElements => {
                const elements = { ...portElements };
                delete elements[portId];

                return elements;
            });
        },
        [setPortElements]
    );

    const handleSetConnectionDraft = React.useCallback(
        (output: Output<any> | undefined) => {
            setConnectionDraft(output);
        },
        [setConnectionDraft]
    );

    const handleCommitConnectionDraft = React.useCallback(
        (input: Input<any>) => {
            if (connectionDraft) {
                connectionDraft.connect(input);

                setConnectionDraft(undefined);
            }
        },
        [context, connectionDraft]
    );

    const handleSetSelectedNodes = React.useCallback(
        (nodes?: Node[]) => {
            setSelectedNodes(nodes);
        },
        [setSelectedNodes]
    );

    const handleSetSelectionBounds = React.useCallback(
        (selectionBounds?: IBounds) => {
            setSelectionBounds(selectionBounds);
        },
        [setSelectionBounds]
    );

    React.useEffect(() => {
        if (context && selectionBounds) {
            const bounds = normalizeBounds(selectionBounds);

            const selectionCandidates = [];

            for (const node of context.nodes.values()) {
                const nodeElement = nodeElements[node.id];

                if (nodeElement) {
                    const nodeRect = nodeElement.getBoundingClientRect();

                    if (
                        withinBounds(bounds, {
                            ...fromCartesianPoint(
                                CIRCUIT_SIZE,
                                CIRCUIT_SIZE,
                                node.data.position.x - NODE_CENTER,
                                node.data.position.y
                            ),
                            width: nodeRect.width,
                            height: nodeRect.height
                        })
                    ) {
                        selectionCandidates.push(node);
                    }
                }
            }

            handleSetSelectedNodes(selectionCandidates);
        }
    }, [context, selectionBounds, nodeElements]);

    const value = React.useMemo<ICircuitContextValue>(
        () => ({
            context,
            nodeElements,
            setNodeElement: handleSetNodeElement,
            removeNodeElement: handleRemoveNodeElement,
            portElements,
            setPortElement: handleSetPortElement,
            removePortElement: handleRemovePortElement,
            connectionDraft,
            setConnectionDraft: handleSetConnectionDraft,
            commitConnectionDraft: handleCommitConnectionDraft,
            selectedNodes,
            setSelectedNodes: handleSetSelectedNodes,
            selectionBounds,
            setSelectionBounds: handleSetSelectionBounds
        }),
        [
            context,
            nodeElements,
            handleSetNodeElement,
            handleRemoveNodeElement,
            portElements,
            connectionDraft,
            handleSetConnectionDraft,
            handleCommitConnectionDraft,
            handleSetPortElement,
            handleRemovePortElement,
            handleSetSelectedNodes,
            selectedNodes,
            selectionBounds,
            setSelectionBounds
        ]
    );

    return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>;
};
