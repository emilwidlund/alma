import * as React from 'react';

import { Context } from '../../../core/api/Context/Context';
import { CircleNode } from '../../../core/api/Node/CircleNode/CircleNode';
import { ColorNode } from '../../../core/api/Node/ColorNode/ColorNode';
import { Vector2Node } from '../../../core/api/Node/Vector2Node/Vector2Node';
import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { SchematicContainer } from '../../containers/SchematicContainer/SchematicContainer';
import { RendererType } from '../../lib/Renderer/Renderer.types';
import { CanvasNode } from '../../nodes/CanvasNode/CanvasNode';
import { SchematicProvider } from '../../providers/SchematicProvider/SchematicProvider';
import { schematicRouteWrapperStyles } from './SchematicRoute.styles';

export const SchematicRoute = () => {
    const context = new Context({ rendererType: RendererType.CANVAS });
    const n1 = new Vector2Node(context, { data: { position: { x: 400, y: 300 } } });
    const n2 = new CircleNode(context, {
        data: { position: { x: 900, y: 400 } }
    });
    const n3 = new CanvasNode(context, {
        data: { position: { x: 400, y: 500 } }
    });
    const n4 = new ColorNode(context, {
        data: { position: { x: 400, y: 700 } }
    });

    n1.outputs.out.connect(n2.inputs.position);

    return (
        <SchematicProvider context={context}>
            <Scene>
                <NavBar>
                    <NavBarItem to="/gallery" children="Gallery" />
                    <NavBarItem to="/about" children="About" />
                    <NavBarItem to="/dashboard" children="Dashboard" />
                </NavBar>
                <div className={schematicRouteWrapperStyles}>
                    <SchematicContainer />
                    <PropertyPanel />
                </div>
            </Scene>
        </SchematicProvider>
    );
};
