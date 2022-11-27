import { Node } from 'alma-graph';
import { ClassConstructor, nodes, GLSLNode } from 'alma-webgl';
import * as React from 'react';

import { CommandPalette } from '../../components/CommandPalette/CommandPalette';
import { Scene } from '../../components/Scene/Scene';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { CircuitContainer } from '../../containers/CircuitContainer/CircuitContainer';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { useCartesianMidpoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint';
import { useCircuitContext } from '../../hooks/useCircuitContext/useCircuitContext';
import { useCodeModal } from '../../hooks/useCodeModal/useCodeModal';
import { useGLSLModal } from '../../hooks/useGLSLModal/useGLSLModal';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { circuitRouteWrapperStyles } from './CircuitRoute.styles';

export const CircuitRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [commandLineOpen, toggleCommandLine] = React.useState(false);
    const { open: openGLSLModal } = useGLSLModal();
    const { open: openCodeModal } = useCodeModal();

    const context = useCircuitContext(ref);
    const midPoint = useCartesianMidpoint(circuitRef);

    const handleCommandPaletteItemSelect = React.useCallback(
        (node: ClassConstructor<Node>) => {
            return () => {
                if (context) {
                    new node(context, { data: { position: midPoint.current } });
                }
            };
        },
        [midPoint, context]
    );

    const handleCreateGLSLNode = React.useCallback(() => {
        if (context) {
            openGLSLModal({
                onSave: glsl => {
                    if (context) {
                        new GLSLNode(context, { data: { glsl, position: midPoint.current } });
                    }
                }
            });
        }
    }, [context, midPoint]);

    return (
        <CircuitProvider context={context}>
            <Scene>
                <div className={circuitRouteWrapperStyles}>
                    <CircuitContainer ref={circuitRef} />
                    <PropertyPanel ref={ref} />

                    <Toolbar>
                        <ToolbarItem label="Stream" icon="stream" onClick={handleCreateGLSLNode} />
                        <ToolbarItem
                            label="View Code"
                            icon="data_object"
                            onClick={() => openCodeModal(context?.fragment || '')}
                            outlined
                        />
                        <ToolbarItem label="New Node" icon="add" onClick={() => toggleCommandLine(true)} cta />
                        <ToolbarItem label="Connection" icon="conversion_path" onClick={console.log} />
                        <ToolbarItem label="Fullscreen" icon="open_in_full" onClick={console.log} />
                    </Toolbar>

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
        </CircuitProvider>
    );
};
