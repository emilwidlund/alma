import * as React from 'react';

import { TimeNode } from '../../../nodes/webgl/core/TimeNode/TimeNode';
import { UVNode } from '../../../nodes/webgl/core/UVNode/UVNode';
import { SineNode } from '../../../nodes/webgl/math/SineNode/SineNode';
import { SimplexNoiseNode } from '../../../nodes/webgl/noise/SimplexNoiseNode/SimplexNoiseNode';
import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { SchematicContainer } from '../../containers/SchematicContainer/SchematicContainer';
import { SchematicProvider } from '../../providers/SchematicProvider/SchematicProvider';
import { WebGLContext } from '../../webgl/models/WebGLContext/WebGLContext';
import { schematicRouteWrapperStyles } from './SchematicRoute.styles';

export const SchematicRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const [context, setContext] = React.useState<WebGLContext | undefined>();

    React.useEffect(() => {
        if (ref.current) {
            const ctx = new WebGLContext(ref.current);

            const time = new TimeNode(ctx, { data: { position: { x: 60, y: 500 } } });
            const sine = new SineNode(ctx, { data: { position: { x: 400, y: 500 } } });
            time.outputs.time.connect(sine.inputs.input);

            const uv = new UVNode(ctx, { data: { position: { x: 120, y: 750 } } });
            const simplexNoise = new SimplexNoiseNode(ctx, { data: { position: { x: 800, y: 600 } } });

            sine.outputs.output.connect(simplexNoise.inputs.decay);

            uv.outputs.uv.connect(simplexNoise.inputs.uv);
            simplexNoise.outputs.output.connect(ctx.root.inputs.color);

            const restored = new WebGLContext(ref.current, JSON.parse(JSON.stringify(ctx)));

            setContext(restored);

            console.log(restored);

            restored.render();

            document.addEventListener('fullscreenchange', () => {
                if (ref.current) {
                    restored.dispose().render();
                }
            });

            return () => {
                restored?.dispose();
            };
        }
    }, []);

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
                    <PropertyPanel ref={ref} />
                </div>
            </Scene>
        </SchematicProvider>
    );
};
