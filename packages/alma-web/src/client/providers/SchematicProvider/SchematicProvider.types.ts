import { Context, Input, Node, Output } from 'alma-graph';
import * as React from 'react';

export type ISchematicProviderProps = React.PropsWithChildren<{
    context: Context;
}>;

export interface ISchematicContextValue {
    context: Context | undefined;
    portElements: Record<string, HTMLDivElement>;
    setPortElement(portId: string, portElement: HTMLDivElement): void;
    removePortElement(portId: string): void;
    connectionDraft?: Output<any>;
    setConnectionDraft(output?: Output<any>): void;
    commitConnectionDraft(input: Input<any>): void;
    selectedNode: Node | undefined;
    setSelectedNode(node?: Node): void;
}
