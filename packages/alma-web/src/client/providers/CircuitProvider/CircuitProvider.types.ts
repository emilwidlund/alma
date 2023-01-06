import { Input, Node, Output } from 'alma-graph';
import { Circuit } from 'alma-webgl';
import * as React from 'react';

import { IBounds } from '../../utils/bounds/bounds.types';

export type ICircuitProviderProps = React.PropsWithChildren<{
    circuit: Circuit | undefined;
}>;

export interface ICircuitContextValue {
    circuit: Circuit | undefined;
    nodeElements: Record<string, HTMLDivElement>;
    setNodeElement(portId: string, portElement: HTMLDivElement): void;
    removeNodeElement(portId: string): void;
    portElements: Record<string, HTMLDivElement>;
    setPortElement(portId: string, portElement: HTMLDivElement): void;
    removePortElement(portId: string): void;
    connectionDraft?: Output<any>;
    setConnectionDraft(output?: Output<any>): void;
    commitConnectionDraft(input: Input<any>): void;
    selectedNodes: Node[] | undefined;
    setSelectedNodes(nodes?: Node[]): void;
    selectionBounds?: IBounds;
    setSelectionBounds(selectionBounds?: IBounds): void;
}
