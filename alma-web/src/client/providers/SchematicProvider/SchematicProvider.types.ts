import * as React from 'react';

import type { Context } from '../../../core/api/Context/Context';
import { INode } from '../../../core/api/Node';
import { Input, Output } from '../../../core/api/Port';

export type ISchematicProviderProps = React.PropsWithChildren<{
    context: Context;
}>;

export interface ISchematicContextValue {
    context: Context;
    portElements: Record<string, HTMLDivElement>;
    setPortElement(portId: string, portElement: HTMLDivElement): void;
    removePortElement(portId: string): void;
    connectionDraft?: Output;
    setConnectionDraft(output?: Output): void;
    commitConnectionDraft(input: Input): void;
    selectedNode: INode | undefined;
    setSelectedNode(node?: INode): void;
}
