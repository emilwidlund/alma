import * as React from 'react';

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

            setContext(ctx);

            document.addEventListener('fullscreenchange', () => {
                if (ref.current) {
                    const ctx = new WebGLContext(ref.current);

                    ctx.setUniform('resolution', [ctx.size.width, ctx.size.height]);

                    setContext(ctx);
                }
            });
        }
    }, []);

    React.useEffect(() => {
        const c = context;

        c?.render();

        return () => {
            c?.dispose();
        };
    }, [context]);

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
