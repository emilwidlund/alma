import * as React from 'react';

import { Context } from '../../../core/api/Context/Context';
import { INode } from '../../../core/api/Node';
import { Input, Output } from '../../../core/api/Port';
import { RendererType } from '../../lib/Renderer/Renderer.types';
import type { ISchematicContextValue, ISchematicProviderProps } from './SchematicProvider.types';


const defaultSchematicValue: ISchematicContextValue = {
    context: new Context({ rendererType: RendererType.CANVAS }),
    portElements: {},
    setPortElement: () => {},
    removePortElement: () => {},
    connectionDraft: undefined,
    setConnectionDraft: () => {},
    commitConnectionDraft: () => {},
    selectedNode: undefined,
    setSelectedNode: () => {}
};

export const SchematicContext = React.createContext(defaultSchematicValue);

export const SchematicProvider = ({ context, children }: ISchematicProviderProps) => {
    const [portElements, setPortElements] = React.useState<Record<string, HTMLDivElement>>({});
    const [connectionDraft, setConnectionDraft] = React.useState<Output | undefined>();
    const [selectedNode, setSelectedNode] = React.useState<INode | undefined>();

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
        (output: Output | undefined) => {
            setConnectionDraft(output);
        },
        [setConnectionDraft]
    );

    const handleCommitConnectionDraft = React.useCallback(
        (input: Input) => {
            if (connectionDraft) {
                context.connect(connectionDraft, input);

                setConnectionDraft(undefined);
            }
        },
        [context, connectionDraft]
    );

    const handleSetSelectedNode = React.useCallback(
        (node?: INode) => {
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
