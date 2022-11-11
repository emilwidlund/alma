import { Node } from 'alma-graph';
import * as React from 'react';

import { nodes } from '../../../nodes/webgl';
import { TimeNode } from '../../../nodes/webgl/core/TimeNode/TimeNode';
import { UVNode } from '../../../nodes/webgl/core/UVNode/UVNode';
import { SineNode } from '../../../nodes/webgl/math/SineNode/SineNode';
import { SimplexNoiseNode } from '../../../nodes/webgl/noise/SimplexNoiseNode/SimplexNoiseNode';
import { ClassConstructor } from '../../../nodes/webgl/types';
import { CommandPalette } from '../../components/CommandPalette/CommandPalette';
import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { SchematicContainer } from '../../containers/SchematicContainer/SchematicContainer';
import { useKeyPress } from '../../hooks/useKeyPress/useKeyPress';
import { SchematicProvider } from '../../providers/SchematicProvider/SchematicProvider';
import { WebGLContext } from '../../webgl/models/WebGLContext/WebGLContext';
import { schematicRouteWrapperStyles } from './SchematicRoute.styles';

export const SchematicRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const [context, setContext] = React.useState<WebGLContext | undefined>();
    const [commandLineOpen, toggleCommandLine] = React.useState(false);
    const spacePressed = useKeyPress(' ');

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

            document.addEventListener('fullscreenchange', () => {
                if (ref.current) {
                    restored.reset();
                }
            });

            return () => {
                restored?.dispose();
            };
        }
    }, []);

    React.useEffect(() => {
        if (spacePressed) {
            toggleCommandLine(true);
        }
    }, [spacePressed]);

    const handleCommandPaletteItemSelect = React.useCallback(
        (node: ClassConstructor<Node>) => {
            return () => {
                if (context) {
                    const n = new node(context);
                }
            };
        },
        [context]
    );

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

                    {commandLineOpen && (
                        <CommandPalette
                            items={[...Object.values(nodes)].map(node => ({
                                label: node.name.replace('Node', '').trimEnd(),
                                onSelect: handleCommandPaletteItemSelect(node)
                            }))}
                            onClose={toggleCommandLine.bind(undefined, false)}
                        />
                    )}
                </div>
            </Scene>
        </SchematicProvider>
    );
};
