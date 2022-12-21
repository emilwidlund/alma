import { IContextSerialized } from 'alma-graph';
import { nodes, WebGLContext } from 'alma-webgl';
import { TextureResolver } from 'alma-webgl/build/models/TextureManager/TextureManager.types';
import * as React from 'react';
import { useState } from 'react';

export const useCircuitContext = (ref: React.RefObject<HTMLCanvasElement>, serialized?: IContextSerialized | null) => {
    const [context, setContext] = useState<WebGLContext | undefined>();

    const buildContext = (serialized?: IContextSerialized | null) => {
        if (ref.current && serialized) {
            const gl = ref.current.getContext('webgl2', { preserveDrawingBuffer: true });

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
                    video.autoplay = true;
                    navigator.mediaDevices
                        .getUserMedia({ video: { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight } })
                        .then(stream => {
                            video.srcObject = stream;
                            resolve();
                        });
                });
            };

            const cameraTextureResolver = () => {
                webcamCanvas.getContext('2d')?.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);

                webcamImage.src = webcamCanvas.toDataURL('image/jpeg');

                return webcamImage;
            };

            const textureResolver: TextureResolver = (uri?: string) =>
                new Promise((resolve, reject) => {
                    const image = new Image();
                    image.crossOrigin = 'anonymous';
                    image.onload = () => resolve(image);
                    image.src = uri || '';
                });

            const ctx = new WebGLContext(gl, {
                cameraManager: {
                    onInit: onCameraResolverInit,
                    textureResolver: cameraTextureResolver
                },
                textureManager: {
                    textureResolver: textureResolver
                },
                nodesCollection: nodes,
                ...serialized
            });

            setContext(ctx);

            return () => {
                ctx?.dispose();
            };
        }
    };

    React.useEffect(() => {
        return buildContext(serialized);
    }, []);

    return { context, buildContext };
};
