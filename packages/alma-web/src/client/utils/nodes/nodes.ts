import { Node } from 'alma-graph';
import {
    AdditionNode,
    SubtractionNode,
    MultiplicationNode,
    DivisionNode,
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

const extractItem = (
    createNodeCallback: (nodeClass: ClassConstructor<Node>) => void
): ((nodeClass: ClassConstructor<Node>) => IContextMenuItemProps) => {
    return (nodeClass: ClassConstructor<Node>) => ({
        // @ts-ignore
        label: nodeClass.name.replace('Node', ''),
        // @ts-ignore
        icon: nodeClass.icon,
        onClick: () => {
            createNodeCallback(nodeClass);
        }
    });
};

export const nodesHierarchy: (
    createNodeCallback: (node: ClassConstructor<Node>) => void
) => IContextMenuContainerSection[] = createNodeCallback => [
    {
        items: [
            {
                icon: 'hive',
                label: 'Core',
                items: [{ items: [TimeNode, UVNode, GLSLNode].map(extractItem(createNodeCallback)) }]
            },
            {
                icon: 'shapes',
                label: 'Primitives',
                items: [{ items: [Vector2Node, Vector3Node, Vector4Node].map(extractItem(createNodeCallback)) }]
            },
            {
                icon: 'percent',
                label: 'Math',
                items: [
                    {
                        items: [
                            AdditionNode,
                            SubtractionNode,
                            MultiplicationNode,
                            DivisionNode,
                            ModuloNode,
                            SineNode,
                            CosineNode
                        ].map(extractItem(createNodeCallback))
                    }
                ]
            },
            {
                icon: 'texture',
                label: 'Textures',
                items: [{ items: [CameraNode].map(extractItem(createNodeCallback)) }]
            },
            {
                icon: 'grain',
                label: 'Noise',
                items: [{ items: [SimplexNoiseNode].map(extractItem(createNodeCallback)) }]
            },
            {
                icon: 'construction',
                label: 'Utilities',
                items: [
                    { items: [MixNode, Swizzle2Node, Swizzle3Node, Swizzle4Node].map(extractItem(createNodeCallback)) }
                ]
            }
        ]
    }
];
