import { Input, Node, Output } from 'alma-graph';
import { WebGLContext } from 'alma-webgl';
import * as React from 'react';

export type ICircuitProviderProps = React.PropsWithChildren<{
    context: WebGLContext | undefined;
}>;

export interface ICircuitContextValue {
    context: WebGLContext | undefined;
    portElements: Record<string, HTMLDivElement>;
    setPortElement(portId: string, portElement: HTMLDivElement): void;
    removePortElement(portId: string): void;
    connectionDraft?: Output<any>;
    setConnectionDraft(output?: Output<any>): void;
    commitConnectionDraft(input: Input<any>): void;
    selectedNodes: Node[] | undefined;
    setSelectedNodes(nodes?: Node[]): void;
}
