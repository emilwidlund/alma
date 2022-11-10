import { Input, Node, Output } from 'alma-graph';
import { noop } from 'lodash';
import * as React from 'react';

import type { ISchematicContextValue, ISchematicProviderProps } from './SchematicProvider.types';

const defaultSchematicValue: ISchematicContextValue = {
    context: undefined,
    portElements: {},
    setPortElement: noop,
    removePortElement: noop,
    connectionDraft: undefined,
    setConnectionDraft: noop,
    commitConnectionDraft: noop,
    selectedNode: undefined,
    setSelectedNode: noop
};

export const SchematicContext = React.createContext(defaultSchematicValue);

export const SchematicProvider = ({ context, children }: ISchematicProviderProps) => {
    const [portElements, setPortElements] = React.useState<Record<string, HTMLDivElement>>({});
    const [connectionDraft, setConnectionDraft] = React.useState<Output<any> | undefined>();
    const [selectedNode, setSelectedNode] = React.useState<Node | undefined>();

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
                context?.connect(connectionDraft, input);

                setConnectionDraft(undefined);
            }
        },
        [context, connectionDraft]
    );

    const handleSetSelectedNode = React.useCallback(
        (node?: Node) => {
            setSelectedNode(node);
        },
        [setSelectedNode]
    );

    const value = React.useMemo<ISchematicContextValue>(
        () => ({
            context,
            portElements,
            setPortElement: handleSetPortElement,
            removePortElement: handleRemovePortElement,
            connectionDraft,
            setConnectionDraft: handleSetConnectionDraft,
            commitConnectionDraft: handleCommitConnectionDraft,
            selectedNode,
            setSelectedNode: handleSetSelectedNode
        }),
        [
            context,
            portElements,
            connectionDraft,
            handleSetConnectionDraft,
            handleCommitConnectionDraft,
            handleSetPortElement,
            handleRemovePortElement,
            handleSetSelectedNode,
            selectedNode
        ]
    );

    return <SchematicContext.Provider value={value}>{children}</SchematicContext.Provider>;
};
