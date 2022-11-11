import { draw, ModelSpec } from '@thi.ng/webgl';
import * as React from 'react';

import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { SchematicContainer } from '../../containers/SchematicContainer/SchematicContainer';
import { SchematicProvider } from '../../providers/SchematicProvider/SchematicProvider';
import { WebGLContext } from '../../webgl/models/WebGLContext/WebGLContext';
import { setupWebGL } from '../../webgl/setup';
import { schematicRouteWrapperStyles } from './SchematicRoute.styles';

export const SchematicRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const t0 = React.useRef(Date.now());
    const [context, setContext] = React.useState<WebGLContext | undefined>();

    const render = React.useCallback((model: ModelSpec) => {
        requestAnimationFrame(render.bind(this, model));

        const time = (Date.now() - t0.current) * 0.001;
        model.uniforms!.time = time;
        draw(model);
    }, []);

    React.useEffect(() => {
        const { model, context: ctx } = setupWebGL(ref.current);

        setContext(ctx);

        requestAnimationFrame(render.bind(this, model));
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
