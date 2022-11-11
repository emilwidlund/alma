import { Input, Node, Output } from 'alma-graph';
import * as React from 'react';

import { WebGLContext } from '../../webgl/models/WebGLContext/WebGLContext';

export type ISchematicProviderProps = React.PropsWithChildren<{
    context: WebGLContext | undefined;
}>;

export interface ISchematicContextValue {
    context: WebGLContext | undefined;
    portElements: Record<string, HTMLDivElement>;
    setPortElement(portId: string, portElement: HTMLDivElement): void;
    removePortElement(portId: string): void;
    connectionDraft?: Output<any>;
    setConnectionDraft(output?: Output<any>): void;
    commitConnectionDraft(input: Input<any>): void;
    selectedNode: Node | undefined;
    setSelectedNode(node?: Node): void;
}
