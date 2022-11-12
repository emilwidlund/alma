import { Node } from 'alma-graph';
import { WebGLContext, TimeNode, SineNode, UVNode, SimplexNoiseNode, ClassConstructor, nodes } from 'alma-webgl';
import * as React from 'react';

import { CommandPalette } from '../../components/CommandPalette/CommandPalette';
import { NavBar, NavBarItem } from '../../components/NavBar/NavBar';
import { Scene } from '../../components/Scene/Scene';
import { PropertyPanel } from '../../containers/PropertyPanel/PropertyPanel';
import { SchematicContainer } from '../../containers/SchematicContainer/SchematicContainer';
import { useKeyPress } from '../../hooks/useKeyPress/useKeyPress';
import { SchematicProvider } from '../../providers/SchematicProvider/SchematicProvider';
import { schematicRouteWrapperStyles } from './SchematicRoute.styles';

export const SchematicRoute = () => {
    const ref = React.useRef<HTMLCanvasElement>(null);
    const [context, setContext] = React.useState<WebGLContext | undefined>();
    const [commandLineOpen, toggleCommandLine] = React.useState(false);
    const spacePressed = useKeyPress(' ');

    React.useEffect(() => {
        if (ref.current) {
            const gl = ref.current.getContext('webgl2');

            if (!gl) {
                throw new Error('WebGL could not be initialized');
            }

            const cameraTextureResolver = () =>
                new Promise<WebGLTexture>((resolve, reject) => {
                    // create webcam stream
                    const video = document.createElement('video');
                    video.width = 320;
                    video.height = 240;
                    video.autoplay = true;
                    const constraints = { video: true };
                    navigator.mediaDevices.getUserMedia(constraints).then(stream => (video.srcObject = stream));

                    // IN YOUR RENDER LOOP

                    // setup a canvas that will receive the webcam images
                    const webcamCanvas = document.createElement('canvas');
                    webcamCanvas.width = video.width;
                    webcamCanvas.height = video.height;
                    webcamCanvas.getContext('2d')?.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);
                    // make an image from the canvas
                    const webcamImage = new Image();
                    webcamImage.src = webcamCanvas.toDataURL();
                    webcamImage.onload = () => {
                        // use the new image as a texture
                        const webcamTexture = gl.createTexture();
                        // send to GPU
                        gl.activeTexture(gl.TEXTURE0);
                        gl.bindTexture(gl.TEXTURE_2D, webcamTexture);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, webcamImage);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                        if (webcamTexture) {
                            resolve(webcamTexture);
                        }
                    };
                });

            const ctx = new WebGLContext(gl, {
                cameraTextureResolver
            });

            const time = new TimeNode(ctx, { data: { position: { x: 60, y: 500 } } });
            const sine = new SineNode(ctx, { data: { position: { x: 400, y: 500 } } });
            time.outputs.time.connect(sine.inputs.input);

            const uv = new UVNode(ctx, { data: { position: { x: 120, y: 750 } } });
            const simplexNoise = new SimplexNoiseNode(ctx, { data: { position: { x: 800, y: 600 } } });

            sine.outputs.output.connect(simplexNoise.inputs.decay);

            uv.outputs.uv.connect(simplexNoise.inputs.uv);
            simplexNoise.outputs.output.connect(ctx.root.inputs.color);

            const restored = new WebGLContext(gl, { cameraTextureResolver, ...JSON.parse(JSON.stringify(ctx)) });

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
                    new node(context);
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
