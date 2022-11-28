import { Node } from 'alma-graph';
import {
    AdditionNode,
    CameraNode,
    ClassConstructor,
    CosineNode,
    GLSLNode,
    MixNode,
    ModuloNode,
    SimplexNoiseNode,
    SineNode,
    Swizzle2Node,
    Swizzle3Node,
    Swizzle4Node,
    TimeNode,
    UVNode,
    Vector2Node,
    Vector3Node,
    Vector4Node
} from 'alma-webgl';

import { IContextMenuContainerSection } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer.types';
import { IContextMenuItemProps } from '../../components/ContextMenu/ContextMenuItem/ContextMenuItem.types';

// @ts-ignore
const extractItem = (node: ClassConstructor<Node>): IContextMenuItemProps => ({
    label: node.name,
    // @ts-ignore
    icon: node.icon
});

export const nodesHierarchy: IContextMenuContainerSection[] = [
    {
        items: [
            {
                icon: 'stream',
                label: 'Core',
                items: [{ items: [TimeNode, UVNode, GLSLNode].map(extractItem) }]
            },
            {
                icon: 'percent',
                label: 'Math',
                items: [
                    {
                        items: [
                            AdditionNode,
                            ModuloNode,
                            SineNode,
                            CosineNode,
                            Vector2Node,
                            Vector3Node,
                            Vector4Node
                        ].map(extractItem)
                    }
                ]
            },
            {
                icon: 'texture',
                label: 'Textures',
                items: [{ items: [CameraNode].map(extractItem) }]
            },
            {
                icon: 'grain',
                label: 'Noise',
                items: [{ items: [SimplexNoiseNode].map(extractItem) }]
            },
            {
                icon: 'folder',
                label: 'Utilities',
                items: [{ items: [MixNode, Swizzle2Node, Swizzle3Node, Swizzle4Node].map(extractItem) }]
            }
        ]
    }
];
