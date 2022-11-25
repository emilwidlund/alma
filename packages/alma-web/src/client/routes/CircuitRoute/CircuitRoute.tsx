import { Node } from 'alma-graph';
import {
    WebGLContext,
    ClassConstructor,
    nodes,
    TimeNode,
    SineNode,
    UVNode,
    SimplexNoiseNode,
    GLSLNode
} from 'alma-webgl';
import * as React from 'react';

import { CommandPalette } from '../../components/CommandPalette/CommandPalette';
import { Scene } from '../../components/Scene/Scene';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ToolbarItem } from '../../components/Toolbar/ToolbarItem';
import { CircuitContainer } from '../../containers/CircuitContainer/CircuitContainer';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { useCartesianMidpoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint';
import { useGLSLModal } from '../../hooks/useGLSLModal/useGLSLModal';
import { useKeyPress } from '../../hooks/useKeyPress/useKeyPress';
import { CircuitProvider } from '../../providers/CircuitProvider/CircuitProvider';
import { circuitRouteWrapperStyles } from './CircuitRoute.styles';

export const CircuitRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const circuitRef = React.useRef<HTMLDivElement>(null);
    const [context, setContext] = React.useState<WebGLContext | undefined>();
    const [commandLineOpen, toggleCommandLine] = React.useState(false);
    const spacePressed = useKeyPress(' ');
    const { open: openGLSLModal } = useGLSLModal();

    const midPoint = useCartesianMidpoint(circuitRef);

    React.useEffect(() => {
        if (ref.current) {
            const gl = ref.current.getContext('webgl2');

            if (!gl) {
                throw new Error('WebGL could not be initialized');
            }

            const video = document.createElement('video');
            const webcamCanvas = document.createElement('canvas');
            const webcamImage = new Image();

            const onCameraResolverInit = () => {
                return new Promise<void>(resolve => {
                    video.width = gl.drawingBufferWidth;
                    video.height = gl.drawingBufferHeight;
                    webcamCanvas.width = gl.drawingBufferWidth;
                    webcamCanvas.height = gl.drawingBufferHeight;
                    console.log(gl.drawingBufferWidth);
                    video.autoplay = true;
                    navigator.mediaDevices
                        .getUserMedia({ video: { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight } })
                        .then(stream => {
                            video.srcObject = stream;
                            resolve();
                        });
                });
            };

            const cameraTextureResolver = () =>
                new Promise<TexImageSource>((resolve, reject) => {
                    webcamCanvas.getContext('2d')?.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);

                    webcamImage.src = webcamCanvas.toDataURL('image/jpeg');

                    resolve(webcamImage);
                });

            const ctx = new WebGLContext(gl, {
                cameraManager: {
                    onInit: onCameraResolverInit,
                    textureResolver: cameraTextureResolver
                },
                nodesCollection: nodes
            });

            // const uv = new UVNode(ctx, { data: { position: { x: 60, y: 500 } } });
            // const camera = new CameraNode(ctx, { data: { position: { x: 400, y: 500 } } });
            // uv.outputs.uv.connect(camera.inputs.uv);
            // camera.outputs.camera.connect(ctx.root.inputs.color);

            const time = new TimeNode(ctx, { data: { position: { x: 60, y: 500 } } });
            const sine = new SineNode(ctx, { data: { position: { x: 400, y: 500 } } });
            time.outputs.time.connect(sine.inputs.input);

            const uv = new UVNode(ctx, { data: { position: { x: 120, y: 750 } } });
            const simplexNoise = new SimplexNoiseNode(ctx, { data: { position: { x: 800, y: 600 } } });

            sine.outputs.output.connect(simplexNoise.inputs.decay);

            uv.outputs.uv.connect(simplexNoise.inputs.uv);
            simplexNoise.outputs.output.connect(ctx.root.inputs.color);

            const restored = new WebGLContext(gl, {
                cameraManager: {
                    onInit: onCameraResolverInit,
                    textureResolver: cameraTextureResolver
                },
                nodesCollection: nodes,
                ...JSON.parse(JSON.stringify(ctx))
            });

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
                        <ToolbarItem label="Gesture" icon="gesture" onClick={console.log} outlined />
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
